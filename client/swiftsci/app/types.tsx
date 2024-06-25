export type Figure = {
    name:String,
    data:String
}

export type User = {
    email: string,
    tokens: number,
    limit_tokens: number,
    _id:String,
    stripe_customer_id:String
}

export type Paper = {
    title: string,
    introduction: string,
    methodology: string,
    results: string,
    discussion:string,
    conclusion:string,
    type:string,
    id:string,
    created_at: string
    content:string
}