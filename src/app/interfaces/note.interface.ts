export interface INotes {
    title:string,
    content:string,
    category: "personal"|"work"|"study"|"other",
    pinned:boolean,
    tags:{
        lebal:string,
        color:string
    },
    userId:Types.ObjectId,
}