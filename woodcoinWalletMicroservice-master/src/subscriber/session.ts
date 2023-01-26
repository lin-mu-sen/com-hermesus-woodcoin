import { EntitySubscriberInterface, EventSubscriber, TransactionCommitEvent, TransactionRollbackEvent, TransactionStartEvent } from "typeorm";
import { DeviceType, Notify } from "../tools";
import { _string_from_date } from "../tools/cron";
// import { Licence } from "../entity/Licence";
// import { Machine } from "../entity/Machine";

@EventSubscriber()
export class SessionSubscriber implements EntitySubscriberInterface {
    // id: number;
    // hashed: string;
    // expiresOn: Date;
    // machines: Machine[];
    /**
      * Called before transaction start.
      */
    beforeTransactionStart(event: TransactionStartEvent) {
        event.manager.query('DELETE FROM session WHERE expiresOn < NOW()').then((res) => {
            console.log("before SessionSubscriber affectedRows:", res.affectedRows);
        });
    }

    // /**
    //  * Called after transaction start.
    //  */
    afterTransactionStart(event: TransactionStartEvent) {
        event.manager.query(`
        DELETE c1 FROM session c1
        INNER JOIN session c2 
        WHERE
            c1.createdAt < c2.createdAt AND 
            c1.fingerprint = c2.fingerprint OR c1.fingerprint = '';
        `).then((res) => {
            console.log("after SessionSubscriber affectedRows:", res.affectedRows);
        });
    }

    // /**
    //  * Called before transaction commit.
    //  */
    // beforeTransactionCommit(event: TransactionCommitEvent) {
    //     console.log(`BEFORE TRANSACTION COMMITTED: `, event);
    // }

    // /**
    //  * Called after transaction commit.
    //  */
    // afterTransactionCommit(event: TransactionCommitEvent) {
    //     console.log(`AFTER TRANSACTION COMMITTED: `, event);
    // }

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