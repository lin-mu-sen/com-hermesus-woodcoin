const express= require('express')
const app = express()
const port = 3820;
const shellExec = require('shell-exec')
app.listen(port, () => {
  console.log(`cli-api-listening ${port}`)
});

app.get('/api/balance/:id', async function (req, res) {
  try {
    let data = await command_1("getbalance "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/validate/:id', async function (req, res) {
  try {
    let data = await command_1("validateaddress "+ String(req.params.id));
    if(data.status == "OK") {
      delete data.payload.ismine 
      delete data.payload.scriptPubKey 
    }
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/address/:id', async function (req, res) {
  try {
    let data = await command_1("getaccount "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
// app.get('/api/blocktoaddress/:id', async function (req, res) {
//   try {
//     let data = await command_1(`generatetoaddress 1 \"${String(req.params.id)}\"`);
//     res.json(data);
//   } catch (error) {
//     res.status(400).json(null)
//   }
// });
app.post('/api/getaddress', async function (req, res) {
  try {
    let data = await command_1(`getnewaddress`);
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/bestblock/:id', async function (req, res) {
  try {
    let data = await command_1("getbestblockhash "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/block/:id', async function (req, res) {
  try {
    let data = await command_1("getblock "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/hash/:id', async function (req, res) {
  try {
    let data = await command_1("getblockhash "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/header/:id', async function (req, res) {
  try {
    let data = await command_1("getblockheader "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/difficulty', async function (req, res) {
  try {
    let data = await command_1("getdifficulty ");
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/txout/:id', async function (req, res) {
  try {
    let data = await command_1("gettxout "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/txproof/:id', async function (req, res) {
  try {
    let data = await command_1("gettxoutproof "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/verifytxpf/:id', async function (req, res) {
  try {
    let data = await command_1("getrawtransaction "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/lstx/:id', async function (req, res) {
  try {
    let data = await command_1("listtransactions "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/dumpprivkey/:id', async function (req, res) {
  try {
    let data = await command_1("dumpprivkey "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/lsrsac/:id', async function (req, res) {
  try {
    let data = await command_1("listreceivedbyaccount "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/lstxblock/:id/', async function (req, res) {
  try {
    let data = await command_1("listsinceblock "+ String(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/signrwtx', async function (req, res) {
  try {
    let data = await command_1("listsinceblock "+ Object.values(JSON.parse(req.body)).join(" "));
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/setac', async function (req, res) {
  try {
    let data = await command_1(`setaccount ${req.headers.address} ${req.headers.name}`);
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/getbalance', async function (req, res) {
  console.log(req.headers.address);
  try {
    let data = await command_1(`getbalance ${req.headers.address}`);
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/getbalancebyid', async function (req, res) {
  // console.log(req.headers.address);
  try {
    // let data = await command_1(`getbalance  "$(woodcoin-cli getaccount  ${req.headers.address})"`);
    let _data = await command_1("getaccount "+ String(req.headers.address));
    let data = await command_1(`getbalance ${_data.payload}`);
    if(_data && _data.status == "OK"){
      res.json(data);
    } else {
      res.status(400).json(null)
    }
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/sendfromtoa', async function (req, res) {
  console.log(req.headers.address);
  //  woodcoin-cli sendfrom kimo WkqjzT9x4jCM5gtJDeLZTfUT3XtbrDFZQ8 0.01
  try {
    let data0 = await command_1(`getbalance  "$(woodcoin-cli getaccount  ${req.headers.address})"`);
    console.log(data0);
     if(data0.payload && Number(data0.payload) > 0.000452){
      let data = await command_1(`sendfrom "$(woodcoin-cli getaccount  ${req.headers.address})" ${req.headers.towhom} ${req.headers.amount}`);
      let d = setTimeout(()=>{
        if(data){
          res.json(data);
        } else {
          res.json({status:false, error:"null (small amount - or no auth)"})
        }        
        clearTimeout(d)
      }, 10000)
     } else {
      res.json({status:false, error:"not enough"});
     }
    
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/sendfromtoac', async function (req, res) {
  // console.log(req.headers.address);
  //  woodcoin-cli sendfrom kimo WkqjzT9x4jCM5gtJDeLZTfUT3XtbrDFZQ8 0.01
  try {
    let data0 = await command_1(`getbalance ${req.headers.address}`);
    // console.log(data0);
     if(data0.payload && Number(data0.payload) > 0.0005){
      let data = await command_1(`sendfrom ${req.headers.address} ${req.headers.towhom} ${req.headers.amount}`);
      let d = setTimeout(()=>{
        if(data){
          res.json(data);
        } else {
          res.json({status:false, error:"null (small amount - or no auth)"})
        }        
        clearTimeout(d)
      }, 10000)
     } else {
      res.json({status:false, error:"not enough"});
     }
    
  } catch (error) {
    res.status(400).json(null)
  }
});
app.get('/api/listtransactions/:id', async function (req, res) {
  // console.log(req.headers.address);
  try {
    let data = await command(` listtransactions "$(woodcoin-cli getaccount  ${req.params.id})"`);
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.post('/api/getacaddress', async function (req, res) {
  // console.log(req.headers.address);
  try {
    let data = await command_1(`getaccountaddress ${req.headers.name}`);
    res.json(data);
  } catch (error) {
    res.status(400).json(null)
  }
});
app.use(express.urlencoded({
  extended: true
}));
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found or missing resource.....'
  })
})

function command_1(command){
  return new Promise(async (resolve, reject)=>{
    let res = await shellExec(`woodcoin-cli ${command}`)
    console.log(res);
    if(res && res.code == 0){
      resolve({status:"OK", payload:String(res.stdout).replace(/[/\n]/g, "")})
    } else {
      reject({status:"ERR", payload:null})
    }
  })
}
function command(command){
  return new Promise(async (resolve, reject)=>{
    let res = await shellExec(`woodcoin-cli ${command}`)
    console.log(res);
    if(res && res.code == 0){
      resolve({status:"OK", payload:JSON.parse(res.stdout)})
    } else {
      reject({status:"ERR", payload:null})
    }
  })
}