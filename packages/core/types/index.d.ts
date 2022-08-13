declare module "@discord-interactions/core" {
// Generated by dts-bundle-generator v6.12.0

import { DiscordApiClient } from '@discord-interactions/api';
import { Bitfield, ButtonBuilder, CommandData, CommandGroupBuilder, MessageBuilder, MessageCommandBuilder, ModalBuilder, SelectMenuBuilder, SlashCommandBuilder, UserCommandBuilder } from '@discord-interactions/builders';
import { APIActionRowComponentTypes, APIApplicationCommand, APIApplicationCommandAutocompleteInteraction, APIApplicationCommandAutocompleteResponse, APIApplicationCommandInteraction, APIApplicationCommandInteractionDataAttachmentOption, APIApplicationCommandInteractionDataBooleanOption, APIApplicationCommandInteractionDataChannelOption, APIApplicationCommandInteractionDataIntegerOption, APIApplicationCommandInteractionDataMentionableOption, APIApplicationCommandInteractionDataNumberOption, APIApplicationCommandInteractionDataRoleOption, APIApplicationCommandInteractionDataStringOption, APIApplicationCommandInteractionDataUserOption, APIApplicationCommandOptionChoice, APIAttachment, APIButtonComponentWithCustomId, APIChatInputApplicationCommandInteraction, APIGuildMember, APIInteraction, APIInteractionDataResolvedChannel, APIInteractionDataResolvedGuildMember, APIInteractionResponse, APIInteractionResponseChannelMessageWithSource, APIInteractionResponseDeferredChannelMessageWithSource, APIInteractionResponseDeferredMessageUpdate, APIInteractionResponseUpdateMessage, APIMessage, APIMessageApplicationCommandInteraction, APIMessageComponentButtonInteraction, APIMessageComponentInteraction, APIMessageComponentSelectMenuInteraction, APIModalInteractionResponse, APIModalInteractionResponseCallbackData, APIModalSubmitInteraction, APIRole, APISelectMenuComponent, APIUser, APIUserApplicationCommandInteraction, ApplicationCommandType, ModalSubmitComponent, RESTPostAPIApplicationCommandsJSONBody, RESTPostAPIChatInputApplicationCommandsJSONBody, RESTPostAPIContextMenuApplicationCommandsJSONBody, Snowflake } from 'discord-api-types/v10';
import { LocaleString } from 'discord-api-types/v6';
import { FormData } from 'formdata-node';

export class ComponentManager {
	cache?: GenericCache | undefined;
	private _components;
	/**
	 * Create a new component manager, with an optional cache.
	 * @param cache Cache to use for storing large state objects
	 * @param prefix Prefix for component IDs, used to namespace components (e.g per-command) as duplicate IDs will cause issues
	 */
	constructor(cache?: GenericCache | undefined);
	has(name: string): boolean;
	get(name: string): (Component | Modal) | undefined;
	register(...components: (Component | Modal)[]): void;
	unregister(name: string): void;
	createInstance<Builder extends ButtonBuilder | SelectMenuBuilder | ModalBuilder = ButtonBuilder | SelectMenuBuilder>(name: string, data?: object, ttl?: number): Promise<Builder>;
}
/** Cache used to store component states. Redis is recommended. */
export interface GenericCache {
	/** Default Time To Live for cache entries, defaults to 900. */
	ttl?: number;
	get: (key: string) => Promise<string | null>;
	set: (key: string, ttl: number, value: string) => Promise<string | void>;
}
export interface DiscordApplicationOptions {
	/** Application Client ID */
	clientId: Snowflake;
	/** Application Public Key */
	publicKey: string;
	/** Application Bot Token */
	token: string;
	/** Hooks to perform additional processing on certain interactions before passing to their handlers. Upon returning true, all further execution is halted. */
	hooks?: Partial<InteractionHooks>;
	/** Component State Cache */
	cache?: GenericCache;
	/** What mode to use for syncing the global command manager. */
	syncMode?: SyncMode;
	/** Whether to preserve the raw interaction object in contexts under ctx.raw - Default: false */
	preserveRaw?: boolean;
	/** Timeout after which InteractionHandlerTimedOut is thrown - Default: 2500ms */
	timeout?: number;
}
export type ResponseCallback<T extends APIInteractionResponse | FormData = APIInteractionResponse | FormData> = (response: T) => void;
export enum SyncMode {
	Disabled = "off",
	Enabled = "on",
	Strict = "strict"
}
/**
 * Main class for managing a Discord Application's commands and handling interactions.
 */
export class DiscordApplication {
	private token;
	publicKey: string;
	clientId: Snowflake;
	cache?: GenericCache;
	commands: CommandManager;
	guildCommands: Map<Snowflake, CommandManager>;
	components: ComponentManager;
	preserveRaw: boolean;
	timeout: number;
	hooks: InteractionHooks;
	rest: DiscordApiClient;
	constructor(options: DiscordApplicationOptions);
	/**
	 * Verify an incoming interaction's signature.
	 * @param timestamp Interaction Request's "X-Signature-Timestamp" Header
	 * @param signature Interaction Request's "X-Signature-Ed25519" Header
	 * @param body Raw Interaction Request Body - If you parse this as JSON beforehand, verification will fail for certain interactions.
	 * @returns Whether or not the request signature is valid.
	 */
	verifyInteractionSignature(signature: string, timestamp: string, body: string): Promise<boolean>;
	createGuildCommandManager(guildId: Snowflake, syncMode?: SyncMode): CommandManager;
	setAPIClient(client: DiscordApiClient): void;
	/**
	 * Handle an incoming interaction request
	 * @param body Raw interaction body
	 * @param signature Request's "X-Signature-Ed25519" header or false to skip signature verification
	 * @param timestamp Request's "X-Signature-Timestamp" header
	 * @returns Array containing the interaction response, and a callback to be called after you have sent the response
	 */
	handleInteraction(body: string, signature: string | false, timestamp?: string): Promise<[
		Promise<APIInteractionResponse | FormData>,
		Promise<void>
	]>;
	private _handleInteraction;
	addHook<T extends keyof InteractionHooks>(hook: T, handler: (ctx: ContextMap[T]) => Promise<void | true>): void;
}
export interface APIApplicationSlashCommand extends APIApplicationCommand {
	type: ApplicationCommandType.ChatInput;
}
export interface APIApplicationUserCommand extends APIApplicationCommand {
	type: ApplicationCommandType.User;
}
export interface APIApplicationMessageCommand extends APIApplicationCommand {
	type: ApplicationCommandType.Message;
}
export interface ParsedCommands {
	[ApplicationCommandType.ChatInput]: Map<string, APIApplicationSlashCommand>;
	[ApplicationCommandType.Message]: Map<string, APIApplicationUserCommand>;
	[ApplicationCommandType.User]: Map<string, APIApplicationMessageCommand>;
}
export type MappedCommandTypes = {
	[ApplicationCommandType.ChatInput]: RegisteredSlashCommand | RegisteredCommandGroup;
	[ApplicationCommandType.Message]: RegisteredMessageCommand;
	[ApplicationCommandType.User]: RegisteredUserCommand;
};
/**
 * Manager for your application's commands. Lets you register fully handled commands as well as exposes methods for managing your commands on the API side.
 */
export class CommandManager {
	[ApplicationCommandType.ChatInput]: Map<string, RegisteredSlashCommand | RegisteredCommandGroup>;
	[ApplicationCommandType.User]: Map<string, RegisteredUserCommand>;
	[ApplicationCommandType.Message]: Map<string, RegisteredMessageCommand>;
	app: DiscordApplication;
	syncMode: SyncMode;
	guildId?: Snowflake;
	constructor(app: DiscordApplication, guildId?: Snowflake, syncMode?: SyncMode);
	postCommand(data: CommandData): Promise<APIApplicationCommand>;
	patchCommand(id: Snowflake, data: CommandData): Promise<APIApplicationCommand>;
	deleteCommand(id: Snowflake): Promise<unknown>;
	private parse;
	/**
	 * Check whether a command is registered
	 * @param name Command name
	 * @param type Command type
	 */
	has(name: string, type?: ApplicationCommandType): boolean;
	/**
	 * Fetch a registered command
	 * @param name Command name
	 * @param type Command type
	 */
	get(name: string, type?: ApplicationCommandType): RegisteredCommand | undefined;
	set(name: string, type: ApplicationCommandType | undefined, command: RegisteredCommand): void;
	/**
	 * Rename a registered command
	 * @param oldName Old name
	 * @param newName New Name
	 * @param type Command type
	 */
	rename(oldName: string, newName: string, type: ApplicationCommandType): void;
	/**
	 * Register a new command to be handled. This will create the command on Discord if it doesn't exist, or overwrite it if the existing remote version differs.
	 */
	register(...commands: ICommand[]): Promise<RegisteredCommand[]>;
	/**
	 * Unregister a command from this client
	 * @param name Command name
	 * @param type Command type
	 * @param deleteCommand Whether to also delete this command from Discord (default: false)
	 */
	unregister(name: string, type?: ApplicationCommandType, deleteCommand?: boolean): Promise<void>;
	sync(syncMode?: SyncMode): Promise<void>;
	/** Deletes remote commands that aren't registered with this command manager */
	deleteUnregistered(): Promise<void>;
	/**
	 * Get an array of API command objects for all registered commands
	 */
	toAPICommands(): RESTPostAPIApplicationCommandsJSONBody[];
}
export interface ICommandBase<Builder, Context> {
	builder: Builder;
	handler: (ctx: Context) => Promise<void>;
	components?: (Component | Modal)[];
}
export abstract class RegisteredDiscordCommand<Builder extends SlashCommandBuilder | CommandGroupBuilder | MessageCommandBuilder | UserCommandBuilder> {
	private manager;
	private lastSync?;
	lastSyncedAt?: Date;
	builder: Builder;
	components?: (Component | Modal)[];
	id: Snowflake;
	constructor(manager: CommandManager, command: {
		builder: Builder;
	});
	private synced;
	/**
	 * Create this command in Discord
	 */
	create(): Promise<void>;
	update(id?: Snowflake): Promise<void>;
	/**
	 * Delete this command from Discord
	 */
	delete(id?: Snowflake): Promise<void>;
	/**
	 * Sync this command with Discord
	 */
	sync(remoteCommand?: APIApplicationCommand): Promise<void>;
}
export abstract class RegisteredCommandBase<Builder extends SlashCommandBuilder | UserCommandBuilder | MessageCommandBuilder, Context extends SlashCommandContext | UserCommandContext | MessageCommandContext> extends RegisteredDiscordCommand<Builder> implements ICommandBase<Builder, Context> {
	handler: (ctx: Context) => Promise<void>;
	constructor(manager: CommandManager, command: {
		builder: Builder;
		handler: (ctx: Context) => Promise<void>;
	});
	/**
	 * Update this command's handler function
	 * @param handler New command handler
	 */
	setHandler(handler: (ctx: Context) => Promise<void>): void;
}
export interface ISubcommandHandler {
	handler: (ctx: SlashCommandContext) => Promise<void>;
	autocompleteHandler?: (ctx: AutocompleteContext) => Promise<void>;
}
export type ISubcommandGroup = Record<string, ISubcommandHandler>;
export type ISubcommandHandlers = Record<string, ISubcommandGroup | ISubcommandHandler>;
export interface ICommandGroup {
	builder: CommandGroupBuilder;
	handlers: ISubcommandHandlers;
	components?: (Component | Modal)[];
}
export class CommandGroup implements ICommandGroup {
	builder: CommandGroupBuilder;
	handlers: ISubcommandHandlers;
	constructor(builder: CommandGroupBuilder, handlers: ISubcommandHandlers, components?: Component[]);
	components: (Component | Modal)[];
	setHandlers(handlers: ISubcommandHandlers): this;
}
export class RegisteredCommandGroup extends RegisteredDiscordCommand<CommandGroupBuilder> {
	handlers: Record<string, ISubcommandHandler | ISubcommandGroup>;
	constructor(manager: CommandManager, command: {
		builder: CommandGroupBuilder;
		handlers: ISubcommandHandlers;
	});
	/**
	 * Update this command's handler function
	 * @param handler New command handler
	 */
	setHandlers(handler: ISubcommandHandlers): void;
}
export function isCommandGroup(command: ICommand): command is ICommandGroup;
export abstract class HandledInteraction<Data, Builder extends {
	toJSON: () => Data;
}, Context> {
	builder: Builder;
	get data(): Data;
	handler: (ctx: Context) => Promise<void>;
	components: (Component | Modal)[];
	constructor(builder: Builder, handler: (ctx: Context) => Promise<void>, components?: (Component | Modal)[]);
	setHandler(handler: (ctx: Context) => Promise<void>): this;
}
export type IMessageCommand = ICommandBase<MessageCommandBuilder, MessageCommandContext>;
export class MessageCommand extends HandledInteraction<RESTPostAPIContextMenuApplicationCommandsJSONBody & {
	type: ApplicationCommandType.Message;
}, MessageCommandBuilder, MessageCommandContext> {
	handler: (ctx: MessageCommandContext) => Promise<void>;
}
export class RegisteredMessageCommand extends RegisteredCommandBase<MessageCommandBuilder, MessageCommandContext> {
}
export interface ISlashCommand extends ICommandBase<SlashCommandBuilder, SlashCommandContext> {
	autocompleteHandler?: (ctx: AutocompleteContext) => Promise<void>;
}
export class SlashCommand extends HandledInteraction<RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, SlashCommandContext> implements ISlashCommand {
	autocompleteHandler: (ctx: AutocompleteContext) => Promise<void>;
	constructor(builder: SlashCommandBuilder, handler?: (ctx: SlashCommandContext) => Promise<void>, components?: Component[], autocompleteHandler?: (ctx: AutocompleteContext) => Promise<void>);
	setAutocompleteHandler(handler: (ctx: AutocompleteContext) => Promise<void>): this;
	setComponents(components: (Component | Modal)[]): this;
	addComponents(...components: (Component | Modal)[]): this;
}
export class RegisteredSlashCommand extends RegisteredCommandBase<SlashCommandBuilder, SlashCommandContext> {
	autocompleteHandler: (ctx: AutocompleteContext) => Promise<void>;
	setAutocompleteHandler(handler: (ctx: AutocompleteContext) => Promise<void>): this;
}
export type IUserCommand = ICommandBase<UserCommandBuilder, UserCommandContext>;
export class UserCommand extends HandledInteraction<RESTPostAPIContextMenuApplicationCommandsJSONBody & {
	type: ApplicationCommandType.User;
}, UserCommandBuilder, UserCommandContext> {
	handler: (ctx: UserCommandContext) => Promise<void>;
}
export class RegisteredUserCommand extends RegisteredCommandBase<UserCommandBuilder, UserCommandContext> {
}
export type ICommand = ISlashCommand | IUserCommand | IMessageCommand | ICommandGroup;
export type Command = SlashCommand | UserCommand | MessageCommand | CommandGroup;
export type RegisteredCommand = RegisteredSlashCommand | RegisteredUserCommand | RegisteredMessageCommand | RegisteredCommandGroup;
export abstract class ComponentBase<Data extends APIActionRowComponentTypes | APIModalInteractionResponseCallbackData, Builder extends {
	toJSON: () => Data;
}, Context> extends HandledInteraction<Data, Builder, Context> {
	id: string;
	allowExpired: boolean;
	parentCommand?: string;
	constructor(id: string, builder: Builder, handler: (ctx: Context) => Promise<void>);
	protected getInstanceData(state: string): Data;
	/** Set the component ID */
	setId(id: string): this;
	/** Set whether component execution should continue when state data has expired */
	setAllowExpired(value: boolean): this;
}
export class Button extends ComponentBase<APIButtonComponentWithCustomId, ButtonBuilder, ButtonContext> {
	constructor(id: string, builder: ButtonBuilder, handler?: (ctx: ButtonContext) => Promise<void>);
	createInstance(state: string): ButtonBuilder;
}
export class WebhookClient {
	private id;
	private token;
	private rest;
	constructor(id: Snowflake, token: string, rest?: DiscordApiClient);
	send(message: string | MessageBuilder, wait?: boolean): Promise<APIMessage>;
	edit(message: string | MessageBuilder, id: Snowflake): Promise<APIMessage>;
	delete(id: Snowflake): Promise<void>;
}
export class BaseInteractionContext<T extends APIInteraction = APIInteraction, R extends APIInteractionResponse | FormData = APIInteractionResponse> {
	private responseCallback;
	protected replied: boolean;
	private repliedAt;
	get expired(): boolean;
	app: DiscordApplication;
	signedAt: Date;
	receivedAt: Date;
	raw?: T;
	interactionId: Snowflake;
	protected followup: WebhookClient;
	app_permissions: Bitfield;
	isDM: boolean;
	guildId?: Snowflake;
	channelId?: Snowflake;
	user: APIUser;
	member?: APIGuildMember;
	locale: LocaleString;
	guildLocale?: LocaleString;
	constructor(app: DiscordApplication, interaction: T, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<R>);
	protected _reply(message: R): Promise<void>;
	rawReply(message: R): Promise<void>;
	decorate(key: string, value: unknown): void;
	createGlobalComponent<Builder extends ButtonBuilder | SelectMenuBuilder | ModalBuilder = ButtonBuilder | SelectMenuBuilder>(name: string, state?: object, ttl?: number): Promise<Builder>;
}
export class BaseStatefulInteractionContext<S = never, T extends APIMessageComponentInteraction | APIModalSubmitInteraction = APIMessageComponentInteraction, R extends APIInteractionResponse | FormData = APIInteractionResponse> extends BaseInteractionContext<T, R> {
	id: string;
	private stateRef;
	state: S;
	allowExpired: boolean;
	parentCommand?: string;
	constructor(app: DiscordApplication, interaction: T, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<R>);
	createComponent<Builder extends ButtonBuilder | SelectMenuBuilder | ModalBuilder = ButtonBuilder | SelectMenuBuilder>(name: string, state?: object, ttl?: number): Promise<Builder>;
	fetchState(): Promise<void>;
}
export type MessageUpdateResponse = APIModalInteractionResponse | APIInteractionResponseUpdateMessage | APIInteractionResponseDeferredMessageUpdate | FormData;
export type ChannelMessageResponse = APIModalInteractionResponse | APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource | FormData;
export type AutocompleteResponse = APIApplicationCommandAutocompleteResponse;
export type ModalSubmitResponse = APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource | FormData;
export class ResolvedData {
	users: Map<Snowflake, APIUser>;
	members: Map<Snowflake, APIInteractionDataResolvedGuildMember>;
	roles: Map<Snowflake, APIRole>;
	channels: Map<Snowflake, APIInteractionDataResolvedChannel>;
	messages: Map<Snowflake, APIMessage>;
	attachments: Map<Snowflake, APIAttachment>;
	constructor();
}
export class BaseCommandContext<T extends APIApplicationCommandInteraction = APIApplicationCommandInteraction> extends BaseInteractionContext<T, ChannelMessageResponse> {
	name: string;
	id: Snowflake;
	commandGuildId?: Snowflake;
	resolved: ResolvedData;
	constructor(app: DiscordApplication, interaction: T, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<ChannelMessageResponse>);
	createComponent<Builder extends ButtonBuilder | SelectMenuBuilder | ModalBuilder = ButtonBuilder | SelectMenuBuilder>(name: string, state?: object, ttl?: number): Promise<Builder>;
	defer(): Promise<void>;
	reply(message: string | MessageBuilder | APIInteractionResponseChannelMessageWithSource | ModalBuilder | APIModalInteractionResponse | FormData): Promise<void>;
	send(message: string | MessageBuilder): Promise<APIMessage>;
	edit(message: string | MessageBuilder): Promise<APIMessage>;
	delete(): Promise<void>;
}
export type AutocompleteSupportedOptions = APIApplicationCommandInteractionDataStringOption | APIApplicationCommandInteractionDataIntegerOption | APIApplicationCommandInteractionDataNumberOption;
export class AutocompleteContext extends BaseInteractionContext<APIApplicationCommandAutocompleteInteraction, APIApplicationCommandAutocompleteResponse> {
	name: string;
	id: Snowflake;
	commandGuildId?: Snowflake;
	resolved: ResolvedData;
	option: AutocompleteSupportedOptions;
	/**
	 * The parent command, if this is a subcommand.
	 */
	parentCommand?: string;
	/**
	 * The subcommand group
	 */
	group?: string;
	constructor(app: DiscordApplication, interaction: APIApplicationCommandAutocompleteInteraction, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<APIApplicationCommandAutocompleteResponse>);
	createComponent<Builder extends ButtonBuilder | SelectMenuBuilder | ModalBuilder = ButtonBuilder | SelectMenuBuilder>(name: string, state?: object, ttl?: number): Promise<Builder>;
	reply(choices: APIApplicationCommandOptionChoice[]): Promise<void>;
	getStringOption(name: string): APIApplicationCommandInteractionDataStringOption;
	getIntegerOption(name: string): APIApplicationCommandInteractionDataNumberOption;
	getNumberOption(name: string): APIApplicationCommandInteractionDataNumberOption;
}
export class MessageCommandContext extends BaseCommandContext<APIMessageApplicationCommandInteraction> {
	message: APIMessage;
	constructor(app: DiscordApplication, interaction: APIMessageApplicationCommandInteraction, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<ChannelMessageResponse>);
}
export class SlashCommandContext extends BaseCommandContext<APIChatInputApplicationCommandInteraction> {
	private options;
	/**
	 * The parent command, if this is a subcommand.
	 */
	parentCommand?: string;
	/**
	 * The subcommand group
	 */
	group?: string;
	constructor(app: DiscordApplication, interaction: APIChatInputApplicationCommandInteraction, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<ChannelMessageResponse>);
	private parseOptions;
	createComponent<Builder extends ButtonBuilder | SelectMenuBuilder | ModalBuilder = ButtonBuilder | SelectMenuBuilder>(name: string, state?: object, ttl?: number): Promise<Builder>;
	hasOption(name: string): boolean;
	getStringOption(name: string): APIApplicationCommandInteractionDataStringOption;
	getIntegerOption(name: string): APIApplicationCommandInteractionDataNumberOption;
	getBooleanOption(name: string): APIApplicationCommandInteractionDataBooleanOption;
	getUserOption(name: string): APIApplicationCommandInteractionDataUserOption & {
		user: APIUser;
		member?: APIInteractionDataResolvedGuildMember;
	};
	getChannelOption(name: string): APIApplicationCommandInteractionDataChannelOption & {
		channel: APIInteractionDataResolvedChannel;
	};
	getRoleOption(name: string): APIApplicationCommandInteractionDataRoleOption & {
		role: APIRole;
	};
	getMentionableOption(name: string): APIApplicationCommandInteractionDataMentionableOption & {
		user?: APIUser;
		role?: APIRole;
	};
	getNumberOption(name: string): APIApplicationCommandInteractionDataNumberOption;
	getAttachmentOption(name: string): APIApplicationCommandInteractionDataAttachmentOption & {
		attachment: APIAttachment;
	};
}
export class UserCommandContext extends BaseCommandContext<APIUserApplicationCommandInteraction> {
	target: {
		user: APIUser;
		member?: APIInteractionDataResolvedGuildMember;
	};
	constructor(app: DiscordApplication, interaction: APIUserApplicationCommandInteraction, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<ChannelMessageResponse>);
}
export class BaseComponentContext<State, T extends APIMessageComponentInteraction = APIMessageComponentInteraction> extends BaseStatefulInteractionContext<State, T, MessageUpdateResponse> {
	message: APIMessage;
	constructor(manager: DiscordApplication, interaction: T, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<MessageUpdateResponse>);
	defer(): Promise<void>;
	reply(message: string | MessageBuilder | APIInteractionResponseUpdateMessage | ModalBuilder | APIModalInteractionResponse | FormData): Promise<void>;
	send(message: string | MessageBuilder): Promise<APIMessage>;
	edit(message: string | MessageBuilder): Promise<APIMessage>;
	delete(): Promise<void>;
}
export class ButtonContext<S = never> extends BaseComponentContext<S, APIMessageComponentButtonInteraction> {
}
export class SelectMenuContext<S = never> extends BaseComponentContext<S, APIMessageComponentSelectMenuInteraction> {
	values: string[];
	constructor(manager: DiscordApplication, interaction: APIMessageComponentSelectMenuInteraction, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<MessageUpdateResponse>);
}
export type ComponentContext = ButtonContext | SelectMenuContext;
export class ModalSubmitContext<State = never> extends BaseStatefulInteractionContext<State, APIModalSubmitInteraction, ModalSubmitResponse> {
	components: Map<string, ModalSubmitComponent>;
	parentCommand?: string;
	constructor(manager: DiscordApplication, interaction: APIModalSubmitInteraction, timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback<ModalSubmitResponse>);
	defer(): Promise<void>;
	reply(message: string | MessageBuilder | APIInteractionResponseChannelMessageWithSource | FormData): Promise<void>;
	send(message: string | MessageBuilder): Promise<APIMessage>;
	edit(message: string | MessageBuilder): Promise<APIMessage>;
	delete(): Promise<void>;
}
export class PingContext {
	signedAt: Date;
	receivedAt: Date;
	responseCallback: ResponseCallback;
	constructor(timestamps: {
		signature: Date;
		received: Date;
	}, responseCallback: ResponseCallback);
	reply(): void;
}
export type InteractionContext = PingContext | SlashCommandContext | UserCommandContext | MessageCommandContext | AutocompleteContext | ButtonContext | SelectMenuContext | ModalSubmitContext;
export class SelectMenu extends ComponentBase<APISelectMenuComponent, SelectMenuBuilder, SelectMenuContext> {
	constructor(id: string, builder: SelectMenuBuilder, handler?: (ctx: SelectMenuContext) => Promise<void>);
	createInstance(state: string): SelectMenuBuilder;
}
export class Modal extends ComponentBase<APIModalInteractionResponseCallbackData, ModalBuilder, ModalSubmitContext> {
	constructor(id: string, builder: ModalBuilder, handler?: (ctx: ModalSubmitContext) => Promise<void>);
	createInstance(state: string): ModalBuilder;
}
export type Component = Button | SelectMenu;
export function _handleInteraction(this: DiscordApplication, interaction: APIInteraction, timestamps: {
	signature: Date;
	received: Date;
}, responseCallback: ResponseCallback): Promise<InteractionContext>;
export type ContextMap = {
	ping: PingContext;
	interaction: InteractionContext;
	"command.slash": SlashCommandContext;
	"command.autocomplete": AutocompleteContext;
	"command.user": UserCommandContext;
	"command.message": MessageCommandContext;
	"component.button": ButtonContext;
	"component.selectMenu": SelectMenuContext;
	modal: ModalSubmitContext;
};
/**
 * Hooks to be executed on receiving an interaction. These are executed before command handlers, and will abort further handling the interaction upon returning true.
 */
export type InteractionHooks = {
	/** This hook runs first for all types of interaction. */
	interaction: ((ctx: InteractionContext) => Promise<void | true>)[];
	ping: ((context: PingContext) => Promise<void | true>)[];
	"command.slash": ((ctx: SlashCommandContext) => Promise<void | true>)[];
	"command.autocomplete": ((ctx: AutocompleteContext) => Promise<void | true>)[];
	"command.user": ((ctx: UserCommandContext) => Promise<void | true>)[];
	"command.message": ((ctx: MessageCommandContext) => Promise<void | true>)[];
	"component.button": ((ctx: ButtonContext) => Promise<void | true>)[];
	"component.selectMenu": ((ctx: SelectMenuContext) => Promise<void | true>)[];
	modal: ((ctx: ModalSubmitContext) => Promise<void | true>)[];
};
export class UnauthorizedInteraction extends Error {
	body: string;
	constructor(body: string);
}
export class InteractionError extends Error {
	interaction: APIInteraction;
	constructor(message: string, interaction: APIInteraction);
}
export class InteractionContextError extends Error {
	context: BaseInteractionContext<APIInteraction, APIInteractionResponse>;
	constructor(message: string, context: BaseInteractionContext<APIInteraction, APIInteractionResponse>);
}
export class UnknownInteractionType extends InteractionError {
	constructor(interaction: APIInteraction);
}
export class UnknownApplicationCommandType extends InteractionError {
	constructor(interaction: APIInteraction);
}
export class UnknownComponentType extends InteractionError {
	constructor(interaction: APIInteraction);
}
export class InteractionResponseAlreadySent extends Error {
	constructor();
}
export class InteractionTokenExpired extends InteractionError {
	constructor(interaction: APIInteraction);
}
export class InteractionHandlerTimedOut extends InteractionError {
	constructor(interaction: APIInteraction);
}
export class InteractionHandlerNotFound extends InteractionError {
	constructor(interaction: APIInteraction);
}
export class InteractionStateExpired extends Error {
	constructor();
}
export class InteractionHandlerError extends InteractionError {
	cause: unknown;
	constructor(interaction: APIInteraction, error: unknown);
}
export type PossibleInteractionErrors = UnauthorizedInteraction | UnknownInteractionType | UnknownApplicationCommandType | UnknownComponentType | InteractionResponseAlreadySent | InteractionTokenExpired | InteractionHandlerTimedOut | InteractionHandlerNotFound | InteractionStateExpired;
export function SimpleError(message: string, title?: string): MessageBuilder;
export function SimpleEmbed(message: string, title?: string): MessageBuilder;

export {};
}