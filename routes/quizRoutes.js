import express from "express";
import auth from "../middleware/authMiddleware.js";
import { checkAnswergp, generategreenplantsquiz, generategreenplantsquiz10, generategreenplantsquiz11, 
    generategreenplantsquiz12, generategreenplantsquiz13, generategreenplantsquiz2,
     generategreenplantsquiz3, generategreenplantsquiz4, generategreenplantsquiz5, generategreenplantsquiz6, generategreenplantsquiz7, generategreenplantsquiz8, generategreenplantsquiz9 } from "../controllers/greenplantsquiz.js";
import { checkwsQuiz, generatewsQuiz, generatewsQuiz10, generatewsQuiz11,
     generatewsQuiz12, generatewsQuiz13, generatewsQuiz2, generatewsQuiz3,
      generatewsQuiz4, generatewsQuiz5, generatewsQuiz6, generatewsQuiz7, 
      generatewsQuiz8, generatewsQuiz9 } from "../controllers/greenplantswsContoller.js";



const router = express.Router();

router.get("/grade4gpquiz", generategreenplantsquiz);
router.get("/grade4gpquiz2", generategreenplantsquiz2);
router.get("/grade4gpquiz3", generategreenplantsquiz3);
router.get("/grade4gpquiz4", generategreenplantsquiz4);
router.get("/grade4gpquiz5", generategreenplantsquiz5);
router.get("/grade4gpquiz6", generategreenplantsquiz6);
router.get("/grade4gpquiz7", generategreenplantsquiz7);
router.get("/grade4gpquiz8", generategreenplantsquiz8);
router.get("/grade4gpquiz9", generategreenplantsquiz9);
router.get("/grade4gpquiz10", generategreenplantsquiz10);
router.get("/grade4gpquiz11", generategreenplantsquiz11);
router.get("/grade4gpquiz12", generategreenplantsquiz12);
router.get("/grade4gpquiz13", generategreenplantsquiz13);

router.get("/grade4gpwsquiz", generatewsQuiz);
router.get("/grade4gpwsquiz2", generatewsQuiz2);
router.get("/grade4gpwsquiz3", generatewsQuiz3);
router.get("/grade4gpwsquiz4", generatewsQuiz4);
router.get("/grade4gpwsquiz5", generatewsQuiz5);
router.get("/grade4gpwsquiz6", generatewsQuiz6);
router.get("/grade4gpwsquiz7", generatewsQuiz7);
router.get("/grade4gpwsquiz8", generatewsQuiz8);
router.get("/grade4gpwsquiz9", generatewsQuiz9);
router.get("/grade4gpwsquiz10", generatewsQuiz10);
router.get("/grade4gpwsquiz11", generatewsQuiz11);
router.get("/grade4gpwsquiz12", generatewsQuiz12);
router.get("/grade4gpwsquiz13", generatewsQuiz13);



router.post("/checkgrade4gpquiz", checkAnswergp);
router.post("/checkgrade4gpwsquiz", checkwsQuiz);



export default router;
