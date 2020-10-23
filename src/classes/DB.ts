import * as functions from "firebase-functions";
import {Client, query as q} from "faunadb";

class DB {

    /**
     *
     * @private {any} db
     *  Holds the Database-Client
     */
    private readonly db: any;

    constructor() {
        this.db = new Client({
            secret: functions.config().database.secret,
            domain: "db.fauna.com",
            scheme: "https"
        });
        console.log("Fauna-Client connected");
    }

    /**
     *
     * @param {string} type
     *  The ressourcetype as string (eg. all, movies, series)
     * @return {Promise<Array<Object>>} Result array
     */
    async getMediaList(type: string) {
        let set = type === "all" ? q.Documents(q.Collection("media")) : q.Match(q.Index("media_by_type"), type);
        let res = await this.db.query(
            q.Map(
                q.Paginate(set),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        );
        console.log(res);
        let data: any[] = [];
        res.data.forEach((doc: any) => data.push(DB.filterDoc(doc)));
        return data;
    }

    /**
     *
     * @param ref
     * @return {Promise<Object>} Result
     */
    async getMedia(ref: string) {
        let doc = await this.db.query(
            q.Get(q.Ref(q.Collection("media"), ref))
        );
        return DB.filterDoc(doc);
    }

    /**
     *
     * @param doc
     * @private
     * @return {Object} Result
     */
    private static filterDoc(doc: any) {
        return {
            id: doc.ref.value.id,
            ...doc.data
        };
    }
}

export default new DB();
