import express, { Request, Response } from 'express';
import checkBody from '../utils/checkbody';


const router = express.Router(); 

router.post("/get_register_user", async (req: Request, res: Response) => {
    
  try {
    const requiredFields = ["username", "password", "email"];
   
    const { username, email, password } = req.body;
    
    if (!checkBody(req.body, requiredFields)) {
      res.status(400).json({ result: false, error: "Missing or empty fields" });
      return;
    }
    const userResponse = await fetch(`${process.env.USER_SERVICE_URL}/user/register`,{
        method: "POST",
        body: JSON.stringify( {
            username,
            password,
            email,
        } ),
        headers:{
            "Content-Type":"application/json"
        },
    })

    if (userResponse.ok) {
      const user = await userResponse.json();
      res.json({ result: true, user });
      console.log(user);
      return;
    } else {
      const errorText = await userResponse.text();
      res.status(userResponse.status).json({ result: false, error: errorText });
      return;
    }

  } catch (error) {
    console.error("Error in get_register_user route:", error);
    res.status(500).json({ result: false, error: "Internal server error" });
    return;
  }
});


router.post("/get_login_user", async (req: Request, res: Response) => {
    
    try {
      const requiredFields = ["username", "password", "email"];
     
      const { username, email, password } = req.body;
      
      if (!checkBody(req.body, requiredFields)) {
        res.status(400).json({ result: false, error: "Missing or empty fields" });
        return;
      }
  
      const userResponse = await fetch(`${process.env.USER_SERVICE_URL}/user/login`,{
          method: "POST",
          body: JSON.stringify( {
              username,
              password,
              email,
          } ),
          headers:{
              "Content-Type":"application/json"
          },
      })
  
      res.json({ result: true, message: "User registered successfully" });
      return;
    } catch (error) {
      console.error("Error in get_register_user route:", error);
      res.status(500).json({ result: false, error: "Internal server error" });
      return;
    }
  });


  router.delete("/deleteAllUser", async (res: Response) => {

    try {
      const userResponse = await fetch(`${process.env.USER_SERVICE_URL}/user/deleteMany`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      if (userResponse.ok) {
        res.status(200).json({ result: true, message: "All users deleted successfully" });
      } else {
        const errorText = await userResponse.text();
        res.status(userResponse.status).json({ result: false, error: errorText });
      }
    } catch (error) {
      console.error("Error in deleteAllUser route:", error);
      res.status(500).json({ result: false, error: "Internal server error" });
    }
  });

export default router;
