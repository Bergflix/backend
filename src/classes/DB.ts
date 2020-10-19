import * as functions from "firebase-functions";
import * as PouchDB from "pouchdb";
import * as PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

class DB {
    private readonly db: any;

    constructor() {
        this.db = new PouchDB("https://couchdb.bergflix.de/bergflix", {
            auth: {
                username: "admin",
                password: process.env.DB_PASS || functions.config().database.pass
            }
        });
        this.db.info().then(() => console.log("DB loaded")).catch((e: any) => console.error("DB-Error", e));
    }

    async getList(type: string){
        // make the query with the type
        let docs = await this.db.query(`scripts/${type}`);
        let data: any[] = [];
        // go through each row
        docs.rows.forEach((row: any) => data.push(DB.filterDoc(row.value)));
        // return the data
        return data;
    }

    async find(selector: object){
        let data = await this.db.find({selector})
        let doc = data.docs[0];
        return DB.filterDoc(doc);
    }

    private static filterDoc(doc: any) {
        doc._id && delete doc._id;
        doc._rev && delete doc._rev;
        return doc;
    }
}

export default new DB();
