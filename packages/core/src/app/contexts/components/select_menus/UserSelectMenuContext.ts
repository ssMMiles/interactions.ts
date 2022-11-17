import {
  APIInteractionDataResolvedGuildMember,
  APIMessageUserSelectInteractionData,
  APIUser
} from "discord-api-types/v10";
import { DiscordApplication, ResponseCallback } from "../../../DiscordApplication.js";
import { MessageUpdateResponse } from "../../response-types.js";
import { BaseSelectMenuContext, SelectMenuInteraction } from "./BaseSelectMenuContext.js";

type SelectMenuDataType = APIMessageUserSelectInteractionData;
export class UserSelectMenuContext<S = never> extends BaseSelectMenuContext<S, SelectMenuDataType> {
  public values: string[];

  public target: {
    user: APIUser;
    member?: APIInteractionDataResolvedGuildMember;
  };

  constructor(
    manager: DiscordApplication,
    interaction: SelectMenuInteraction<SelectMenuDataType>,
    timestamps: { signature: Date; received: Date },
    responseCallback: ResponseCallback<MessageUpdateResponse>
  ) {
    super(manager, interaction, timestamps, responseCallback);

    this.values = interaction.data.values;

    this.target = {
      user: interaction.data.resolved.users[interaction.data.values[0]],
      member: interaction.data.resolved.members?.[interaction.data.values[0]]
    };
  }
}
