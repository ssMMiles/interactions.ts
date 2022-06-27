# Discord Interactions.TS
<div align="center">
  <img src="https://cdn.discordapp.com/attachments/972730353267671070/991107120449724466/interactions.png" alt="Logo" />
  <br />
  <p>
    <a href="https://discord.gg/BTXJmW4Bh7"><img src="https://img.shields.io/discord/395423304112013334?logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/interactions.ts"><img src="https://img.shields.io/npm/v/interactions.ts.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/interactions.ts"><img src="https://img.shields.io/npm/dt/interactions.ts.svg?maxAge=3600" alt="npm downloads" /></a>
    <a href="https://github.com/ssMMiles/interactions.ts/actions"><img src="https://github.com/ssMMiles/interactions.ts/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>
  </p>
</div>

A lightweight but powerful framework for [Discord's Interactions](https://discord.com/developers/docs/interactions/receiving-and-responding). Designed for scalability and simplicity.

# Getting Started

An example bot using the framework is available [here](https://github.com/ssMMiles/bot-template). Additional code snippets can be found below.

## Install

`npm install interactions.ts`

## Links
 - #### [Documentation](https://interactions-ts.pages.dev/)
 - #### [Github](https://github.com/ssMMiles/interactions.ts)
 - #### [NPM](https://www.npmjs.com/package/interactions.ts)

# Receiving Interactions

Interactions.TS is designed to work with any webserver, with it only taking the raw request body and the `X-Signature-Ed25519`/`X-Signature-Timestamp` headers for authorization. The headers are optional, and can be left out if you're handling authorization at an earlier stage.

For this example, we're using Fastify:

```typescript
const server = fastify();
server.register(rawBody);

server.post("/", async (request, reply) => {
  const signature = request.headers["x-signature-ed25519"];
  const timestamp = request.headers["x-signature-timestamp"];

  try {
    const [onResponse, finished] = app.handleInteraction(
      request.rawBody,
      timestamp,
      signature
    );

    onResponse.then((response) => {
      if ("getHeaders" in response) {
        res.headers(response.getHeaders()).code(200).send(response);
        return;
      }

      res.code(200).send(response);
    });

    await finished;
  } catch (err) {
    console.error(err);
  }
});
```

# Registering a Slash Command

This will create a global `/ping` command on your application. If one is already registered, it will be overwritten.

```typescript
const app = new DiscordApplication({
  clientId: process.env.CLIENT_ID,
  token: process.env.TOKEN,
  publicKey: process.env.PUBLIC_KEY,
});

await app.commands.register(
  new SlashCommand(new SlashCommandBuilder("ping", "A simple ping command!"), async (context) => {
    context.reply("Pong!");
  })
);
```

# Command Groups

Command groups, subcommand groups and subcommands are just a little more complex:

```typescript
await app.register([
  new CommandGroup(
    new CommandGroupBuilder("config", "A simple config command.")
      .addSubcommand(new SubcommandOption("get", "Get a config value."))
      .addSubcommand(new SubcommandOption("set", "Set a config value.")),
    {
      get: {
        handler: async (context) => {
          const value = "x";
          context.reply(new MessageBuilder().setContent(`Config value: ${value}!`));
        }
      },
      set: {
        handler: async (context) => {
          context.reply(new MessageBuilder().setContent("Config value set!"));
        }
      }
    }
  )
]);
```


# Guild Commands

```typescript

const guild = new CommandManager(app, guildId);

await guild.register(
  new SlashCommand(new SlashCommandBuilder("pingping", "A guild-specific ping command!"), async (context) => {
    context.reply("Pongpong");
  })
);
```

---------------------------------------------------------------------------------------------------------------------

# Components

Components must be registered in a similar fashion with a unique ID, creating a sort of "template" for your components. You can then create an instance using `context.createGlobalComponent()` which will return a deeply cloned version of your component as a builder, allowing you to further modify it before using it in a response.

Registering a ping command again, this time with a button that reveals a word stored in its state:

```typescript
app.commands.register(
  new SlashCommand(
    new SlashCommandBuilder("ping", "A simple ping command!"),
    async (context) => {
      context.reply(
        new MessageBuilder("Press the button to see a surprise...").addComponents(
          new ActionRowBuilder().addComponents(await context.createComponent("example", { word: "Surprise!" }))
        )
      );
    },
    [
      new Button(
        "example",
        new ButtonBuilder(ButtonStyle.Primary, "Example Button"),
        async (
          ctx: ButtonContext<{
            word: string;
          }>
        ) => {
          return ctx.reply(ctx.state.word);
        }
      )
    ]
  )
);
```

## Namespacing

Command interfaces present an additional `components` property, allowing you to tie components to a command. This prefixes the component IDs with the command's name (`<command>.<component>`), and can then only be retrieved within that command using `context.createComponent()`.

## State

You can also pass an arbitrary object when creating a component instance, allowing you to store state information inside the component's `custom_id` property. (Later accessible in `context.state`). 

This state is stored in the `custom_id` property by default, which will constrain the size of your data. To avoid this, an external cache such as Redis can be configured:

```typescript
const redisClient = createClient();

await redisClient.connect();

const app = new DiscordApplication({
  clientId: process.env.CLIENT_ID,
  token: process.env.TOKEN,
  publicKey: process.env.PUBLIC_KEY,

  cache: {
    get: (key) => redisClient.get(key),
    set: (key, ttl, value) => redisClient.setEx(key, ttl, value)
  }
});
```