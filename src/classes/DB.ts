import * as PouchDB from 'pouchdb';
import * as PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

class DB {

    /**
     *
     * @private {any} db
     *  Holds the Database-Client
     */
    private readonly db: any;

    constructor() {
        this.db = new PouchDB(process.env.DB_PATH, {
            auth: {
                username: process.env.DB_USER,
                password: process.env.DB_PASS
            }
        });
        this.db.info().then(() => console.log("PouchDB loaded")).catch((e: any) => console.error("PouchDB Error:", e));
    }

    /**
     *
     * @param {string} type
     *  The ressourcetype as string (eg. all, movies, series)
     * @return {Promise<Array<any>>} Result array
     */
    async getMediaList(type: string) : Promise<Array<any>> {
        return [];
    }
    
    /**
     *
     * @param ref
     * @return {Promise<any>} Result
     */
    async getMedia(ref: string) {
        return {};
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

    
    /**
     *
     * @param doc
     * @private
     * @return {any} Result
     */
    private static filterDoc(doc: any) {
        doc._id && delete doc._id;
        doc._rev && delete doc._rev;
        return doc;
    }

}

export default new DB();
