import GetCalculatedOutputForUser from "@/components/workdayCalculator";
import { FormData } from "@/models/formData";


export async function POST(req: Request){
    try{
        const body = await req.json();
        console.log("api/workCalc received: ");
        console.log(body);

        let formData = {} as FormData;
        formData = body;

        let output = GetCalculatedOutputForUser(formData);

        
         // // Send a response
        const responseOpt = {
            status: 200,
            statusText: 'yay'
        } 
        let successPayload = {
            msg: output
        }
        return new Response(JSON.stringify(successPayload), responseOpt);
    }catch(error){
        console.error(error);
        const responseOpt = {
          status: 500,
          statusText: ':('
        }
        let failPayload = {
          msg: error
        }
        return new Response(JSON.stringify(failPayload), responseOpt);      
    }
}