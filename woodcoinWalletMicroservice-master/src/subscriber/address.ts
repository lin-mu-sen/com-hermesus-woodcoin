import { EntitySubscriberInterface, EventSubscriber, TransactionCommitEvent, TransactionRollbackEvent, TransactionStartEvent } from "typeorm";
import { Device } from "../entity/Device";
import { _string_from_date } from "../tools/cron";
// import { Licence } from "../entity/Licence";
// import { Machine } from "../entity/Machine";

@EventSubscriber()
export class AddressSubscriber implements EntitySubscriberInterface {
    // id: number;
    // hashed: string;
    // expiresOn: Date;
    // machines: Machine[];
   /**
     * Called before transaction start.
     */
    beforeTransactionStart(event: TransactionStartEvent) {
    }

    // /**
    //  * Called after transaction start.
    //  */
    // afterTransactionStart(event: TransactionStartEvent) {
    //     console.log(`AFTER TRANSACTION STARTED: `, event);
    // }

    // /**
    //  * Called before transaction commit.
    //  */
    // beforeTransactionCommit(event: TransactionCommitEvent) {
    //     console.log(`BEFORE TRANSACTION COMMITTED: `, event);
    // }

    // /**
    //  * Called after transaction commit.
    //  */
    afterTransactionCommit(event: TransactionCommitEvent) {
        console.log(`AFTER TRANSACTION COMMITTED: `);
        event.manager.query(`
        DELETE c1 
        FROM address c1
        INNER JOIN address c2 
        WHERE
            c1.createdAt < c2.createdAt AND 
            c1.chainid = c2.chainid AND
            c1.deviceId = c2.deviceId;
        `);
    }

    // /**
    //  * Called before transaction rollback.
    //  */
    // beforeTransactionRollback(event: TransactionRollbackEvent) {
    //     console.log(`BEFORE TRANSACTION ROLLBACK: `, event);
    // }

    // /**
    //  * Called after transaction rollback.
    //  */
    // afterTransactionRollback(event: TransactionRollbackEvent) {
    //     console.log(`AFTER TRANSACTION ROLLBACK: `, event);
    // }
}