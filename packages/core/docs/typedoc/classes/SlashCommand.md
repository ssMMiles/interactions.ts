[@discord-interactions/core](../README.md) / [Exports](../modules.md) / SlashCommand

# Class: SlashCommand

## Hierarchy

- `HandledInteraction`<`RESTPostAPIChatInputApplicationCommandsJSONBody`, `SlashCommandBuilder`, [`SlashCommandContext`](SlashCommandContext.md)\>

  ↳ **`SlashCommand`**

## Implements

- [`ISlashCommand`](../interfaces/ISlashCommand.md)

## Table of contents

### Constructors

- [constructor](SlashCommand.md#constructor)

### Properties

- [autocompleteHandler](SlashCommand.md#autocompletehandler)
- [builder](SlashCommand.md#builder)
- [components](SlashCommand.md#components)
- [handler](SlashCommand.md#handler)

### Accessors

- [data](SlashCommand.md#data)

### Methods

- [addComponents](SlashCommand.md#addcomponents)
- [setAutocompleteHandler](SlashCommand.md#setautocompletehandler)
- [setComponents](SlashCommand.md#setcomponents)
- [setHandler](SlashCommand.md#sethandler)

## Constructors

### constructor

• **new SlashCommand**(`builder`, `handler?`, `components?`, `autocompleteHandler?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `builder` | `SlashCommandBuilder` | `undefined` |
| `handler` | (`ctx`: [`SlashCommandContext`](SlashCommandContext.md)) => `Promise`<`void`\> | `undefined` |
| `components` | [`Component`](../modules.md#component)[] | `[]` |
| `autocompleteHandler` | (`ctx`: [`AutocompleteContext`](AutocompleteContext.md)) => `Promise`<`void`\> | `undefined` |

#### Overrides

HandledInteraction&lt;RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, SlashCommandContext\&gt;.constructor

#### Defined in

[core/src/app/commands/SlashCommand.ts:17](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/commands/SlashCommand.ts#L17)

## Properties

### autocompleteHandler

• **autocompleteHandler**: (`ctx`: [`AutocompleteContext`](AutocompleteContext.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`ctx`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`AutocompleteContext`](AutocompleteContext.md) |

##### Returns

`Promise`<`void`\>

#### Implementation of

[ISlashCommand](../interfaces/ISlashCommand.md).[autocompleteHandler](../interfaces/ISlashCommand.md#autocompletehandler)

#### Defined in

[core/src/app/commands/SlashCommand.ts:15](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/commands/SlashCommand.ts#L15)

___

### builder

• **builder**: `SlashCommandBuilder`

#### Implementation of

[ISlashCommand](../interfaces/ISlashCommand.md).[builder](../interfaces/ISlashCommand.md#builder)

#### Inherited from

HandledInteraction.builder

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:4](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L4)

___

### components

• **components**: ([`Component`](../modules.md#component) \| [`Modal`](Modal.md))[]

#### Implementation of

[ISlashCommand](../interfaces/ISlashCommand.md).[components](../interfaces/ISlashCommand.md#components)

#### Inherited from

HandledInteraction.components

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:11](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L11)

___

### handler

• **handler**: (`ctx`: [`SlashCommandContext`](SlashCommandContext.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`ctx`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`SlashCommandContext`](SlashCommandContext.md) |

##### Returns

`Promise`<`void`\>

#### Implementation of

[ISlashCommand](../interfaces/ISlashCommand.md).[handler](../interfaces/ISlashCommand.md#handler)

#### Inherited from

HandledInteraction.handler

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:9](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L9)

## Accessors

### data

• `get` **data**(): `Data`

#### Returns

`Data`

#### Inherited from

HandledInteraction.data

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:5](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L5)

## Methods

### addComponents

▸ **addComponents**(...`components`): [`SlashCommand`](SlashCommand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...components` | ([`Component`](../modules.md#component) \| [`Modal`](Modal.md))[] |

#### Returns

[`SlashCommand`](SlashCommand.md)

#### Defined in

[core/src/app/commands/SlashCommand.ts:44](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/commands/SlashCommand.ts#L44)

___

### setAutocompleteHandler

▸ **setAutocompleteHandler**(`handler`): [`SlashCommand`](SlashCommand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`ctx`: [`AutocompleteContext`](AutocompleteContext.md)) => `Promise`<`void`\> |

#### Returns

[`SlashCommand`](SlashCommand.md)

#### Defined in

[core/src/app/commands/SlashCommand.ts:32](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/commands/SlashCommand.ts#L32)

___

### setComponents

▸ **setComponents**(`components`): [`SlashCommand`](SlashCommand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `components` | ([`Component`](../modules.md#component) \| [`Modal`](Modal.md))[] |

#### Returns

[`SlashCommand`](SlashCommand.md)

#### Defined in

[core/src/app/commands/SlashCommand.ts:38](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/commands/SlashCommand.ts#L38)

___

### setHandler

▸ **setHandler**(`handler`): [`SlashCommand`](SlashCommand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`ctx`: [`SlashCommandContext`](SlashCommandContext.md)) => `Promise`<`void`\> |

#### Returns

[`SlashCommand`](SlashCommand.md)

#### Inherited from

HandledInteraction.setHandler

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:20](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L20)