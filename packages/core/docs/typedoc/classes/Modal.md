[@discord-interactions/core](../README.md) / [Exports](../modules.md) / Modal

# Class: Modal

## Hierarchy

- `ComponentBase`<`APIModalInteractionResponseCallbackData`, `ModalBuilder`, [`ModalSubmitContext`](ModalSubmitContext.md)\>

  ↳ **`Modal`**

## Table of contents

### Constructors

- [constructor](Modal.md#constructor)

### Properties

- [allowExpired](Modal.md#allowexpired)
- [builder](Modal.md#builder)
- [components](Modal.md#components)
- [handler](Modal.md#handler)
- [id](Modal.md#id)
- [parentCommand](Modal.md#parentcommand)

### Accessors

- [data](Modal.md#data)

### Methods

- [createInstance](Modal.md#createinstance)
- [setAllowExpired](Modal.md#setallowexpired)
- [setHandler](Modal.md#sethandler)
- [setId](Modal.md#setid)

## Constructors

### constructor

• **new Modal**(`id`, `builder`, `handler?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `builder` | `ModalBuilder` |
| `handler` | (`ctx`: [`ModalSubmitContext`](ModalSubmitContext.md)<`never`\>) => `Promise`<`void`\> |

#### Overrides

ComponentBase&lt;APIModalInteractionResponseCallbackData, ModalBuilder, ModalSubmitContext\&gt;.constructor

#### Defined in

[core/src/app/components/Modal.ts:7](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Modal.ts#L7)

## Properties

### allowExpired

• **allowExpired**: `boolean` = `false`

#### Inherited from

ComponentBase.allowExpired

#### Defined in

[core/src/app/components/Base.ts:10](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Base.ts#L10)

___

### builder

• **builder**: `ModalBuilder`

#### Inherited from

ComponentBase.builder

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:4](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L4)

___

### components

• **components**: ([`Component`](../modules.md#component) \| [`Modal`](Modal.md))[]

#### Inherited from

ComponentBase.components

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:11](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L11)

___

### handler

• **handler**: (`ctx`: [`ModalSubmitContext`](ModalSubmitContext.md)<`never`\>) => `Promise`<`void`\>

#### Type declaration

▸ (`ctx`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`ModalSubmitContext`](ModalSubmitContext.md)<`never`\> |

##### Returns

`Promise`<`void`\>

#### Inherited from

ComponentBase.handler

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:9](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L9)

___

### id

• **id**: `string`

#### Inherited from

ComponentBase.id

#### Defined in

[core/src/app/components/Base.ts:9](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Base.ts#L9)

___

### parentCommand

• `Optional` **parentCommand**: `string`

#### Inherited from

ComponentBase.parentCommand

#### Defined in

[core/src/app/components/Base.ts:12](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Base.ts#L12)

## Accessors

### data

• `get` **data**(): `Data`

#### Returns

`Data`

#### Inherited from

ComponentBase.data

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:5](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L5)

## Methods

### createInstance

▸ **createInstance**(`state`): `ModalBuilder`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `string` |

#### Returns

`ModalBuilder`

#### Defined in

[core/src/app/components/Modal.ts:17](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Modal.ts#L17)

___

### setAllowExpired

▸ **setAllowExpired**(`value`): [`Modal`](Modal.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

[`Modal`](Modal.md)

#### Inherited from

ComponentBase.setAllowExpired

#### Defined in

[core/src/app/components/Base.ts:34](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Base.ts#L34)

___

### setHandler

▸ **setHandler**(`handler`): [`Modal`](Modal.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`ctx`: [`ModalSubmitContext`](ModalSubmitContext.md)<`never`\>) => `Promise`<`void`\> |

#### Returns

[`Modal`](Modal.md)

#### Inherited from

ComponentBase.setHandler

#### Defined in

[core/src/app/handlers/HandledInteraction.ts:20](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/handlers/HandledInteraction.ts#L20)

___

### setId

▸ **setId**(`id`): [`Modal`](Modal.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Modal`](Modal.md)

#### Inherited from

ComponentBase.setId

#### Defined in

[core/src/app/components/Base.ts:28](https://github.com/ssMMiles/interactions.ts/blob/df1cc9e/packages/core/src/app/components/Base.ts#L28)