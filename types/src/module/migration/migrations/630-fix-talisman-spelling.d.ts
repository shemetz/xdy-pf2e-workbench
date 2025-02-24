import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
/** Fix spelling of the "talisman" `consumableType` */
export declare class Migration630FixTalismanSpelling extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
