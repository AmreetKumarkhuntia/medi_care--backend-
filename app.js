//module declrations  
const express=require('express');
const app=express();
const cors=require('cors');

const mongo=require('mongoose');
const { request } = require('express');
// const {Schema}=mongo;

const port=80;
const corsoptions={
    origin: '*',
    Credentials: true,
};


//express server configuration
app.use('/public',express.static('static'));
app.use(express.urlencoded());


//Cors configuration
app.use(cors(corsoptions));


//connect to database medicare
main().catch((err) => { console.log(err); });   

async function main() {
    await mongo.connect('mongodb://localhost:27017/medicare');
    console.log('mongodb connection established');
}


//Schema configuration for database medicare

const hospitalSchema = new mongo.Schema({
    name:{
        type: String,
        unique: [true,'This hospitalname is already registered'],
        required: true,
    },
    contactno: {
        type: Number,
        unique: [true,'This hospitalname is already registered'],
    },
    city: String,
    state: String,
    district: String,
    pincode: {
        type: Number,
        required: true,
    },
    country: String
})

const hospital=mongo.model('hospital',hospitalSchema);

//Api queries

    //test queries
        app.post('/',(req,res)=>{
            // console.log(req);
            res.status(200).json({msg:"Listening for requests..."});   
        });

        app.post('/dummy',(req,res)=>{

            //sample data for database medicare
                const testhospital=hospital({
                    name: "tasdassdasd",
                    contactno: 94211111,
                    city: "tedasd",
                    state:"tasdsaate2",
                    district:"dasdastdrict2",
                    pincode: 1212111,
                    country: "tcou12112"
                });

                testhospital.save();

                res.status(200).json({msg:'created dummy data'});
        });

    //hospital Queries
        app.get('/hospital',(req,res)=>{
            let queries={pincode:req.query.pin};

            req.query.city?queries.city=req.query.city:"";
            req.query.district?queries.district=req.query.district:"";
            req.query.name?queries.name=req.query.name:"";
            req.query.state?queries.state=req.query.state:"";


            hospital.find(queries,(err,hospitals)=>{
                // console.log(hospitals);
                res.status(200).json({hospitals:hospitals,status: true});
            });

        });

//Run server on port 80.
app.listen(port, ()=>{
    console.log('listening on port '+port);
})