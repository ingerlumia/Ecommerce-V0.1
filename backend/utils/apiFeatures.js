class ApiFeatures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }
    search(){
        let keyword = this.querystr.keyword ? {
            name: {
                $regex : this.querystr.keyword,
                $options : 'i'
            }
        }:{};

        this.query.find({...keyword});
        return this;
    }

    filter(){

        const querystrcpy = {...this.querystr};

        const removeFields = ['keyword','limit','page'];
        removeFields.forEach( field => delete querystrcpy[field]);

        let querystr = JSON.stringify(querystrcpy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)/g,match => `$${match}`);
        
        this.query.find(JSON.parse(querystr));
        return this;
    }

    pageination(resperpage){
        const currentpage = Number(this.querystr.page) || 1;
        const skip = resperpage * (currentpage-1);
        this.query.limit(resperpage).skip(skip);
        return this;
    }



}

export default ApiFeatures;