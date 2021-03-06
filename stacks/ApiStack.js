import * as sst from '@serverless-stack/resources';


export default class ApiStack extends sst.Stack {
    // Be able to reference API from other stacks (Publicly referencable)
    api;

    constructor(scope,id,props){
        super(scope,id,props);

        const { table } = props;

        // Create the Api
        this.api = new sst.Api(this, "Api", {
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName,
                },
            },
            routes: {
                "POST   /notes": "src/create.main",
                "GET   /notes/{id}": "src/get.main",
                "GET   /notes": "src/list.main",
                "PUT   /notes/{id}": "src/update.main",
                "DELETE   /notes/{id}": "src/delete.main",
            },
        });

        // Allow the API to access the table
        this.api.attachPermissions([table]);

        // Show the API endpooint in the output
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}