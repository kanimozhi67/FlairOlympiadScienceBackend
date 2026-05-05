import express from "express";
import auth from "../middleware/authMiddleware.js";
//import { getQuestion } from "../controllers/quizController.js";
import {
  generateSortingQuestions3,
  generateSortingQuestions,
  checkSortingAnswers,
  generateSortingQuestions2,
} from "../controllers/quizcontrollersort.js";
import {
  generateSortingQuestionsp3,
  generateSortingQuestionsp,
  generateSortingQuestionsp2,
} from "../controllers/quizcontrollersort.js";
import {
  generateQuestionMul,
  generateQuestionMul2,
  generateQuestionMul3,
  checkAnswerCircle,
  checkAddCircle,
  generateQuestionDiv,
  generateQuestionDiv2,
  generateQuestionDiv3,
  generateQuestionAddSubp2
} from "../controllers/quizController.js";
import {
  generateQuestionMulp,
  generateQuestionMulp2,
  generateQuestionMulp3,
} from "../controllers/quizController.js";
import {
  checkAnswer,
  generateQuestionAddSub,
  generateQuestionAddSub3,
  generateQuestionAddSubp,
  generateQuestionAddSubp3,
} from "../controllers/quizController.js";
import {
  genUnitQuiz,checkUnitAnswers,
  genAvgQuiz,checkAvgAnswers,genWordQuiz,checkWordAnswers
} from "../controllers/measurementController.js";
import {
  genMoney,genMoney2,checkAnswerMoney,genWordProblems
} from "../controllers/moneyController.js"
import {
  generateSudoku,
  generateSudoku2,
  generateSudoku3,
  checkSudoku,
} from "../controllers/sudokuController.js";
import {
  generateSudokup,
  generateSudokup2,
  generateSudokup3,
  checkSudokup,
} from "../controllers/psudokuController.js";
import {
  generatePuzzle,

  checkPuzzle,
  generatePuzzle2,
} from "../controllers/puzzleController.js";
import {
  generateLogic,
  generateLogic2,
  generateLogic3,
  checkLogic,
} from "../controllers/logicalController.js";
import { generateLogicp } from "../controllers/logicalController.js";
import { checkShapeAnswerStep, generateShapeQuizStep, generateShapeQuizStep2, generateShapeQuizStep3, generateShapeQuizStepp1, generateShapeQuizStepp2 } from "../controllers/shapesController.js";
import { checkAnswerFraction,  checkAnswerFraction2,  generateFractionQuiz, generateFractionQuiz2,
   generateFractionQuiz3, generateFractionQuizk, generateFractionQuizk2, 
   generateFractionQuizk3, generateFractionQuizPuzz2, generateFractionQuizPuzz3, 
   generateqFractionQuiz4, hcfFractionQuiz4, lcmFractionQuiz4, logicQuizPuzz2, logicQuizPuzz3, mixedFractionQuiz4, puzzlep2, puzzlep3, 
   wordFractionQuiz4,
   wordMoneyQuiz4} from "../controllers/fractionController.js";
import { explainWrongAnswer, explainWrongAnswer2, explainWrongAnswer3 } from "../controllers/openaiController.js";
import {checkFacePlace, genFacePlace} from "../controllers/placevalueController.js";
import { genNumberFormation, checkNumberFormation } from "../controllers/placevalue2Controller.js";
import { checkRoundingQuiz, genRoundingQuiz } from "../controllers/roundingoffController.js";
import { checkExpandedQuiz, checkStandardQuiz, genExpandedQuiz, genStandardQuiz } from "../controllers/expandedformController.js";
import { checkIPlaceValue, genIPlaceValue } from "../controllers/internationalpvController.js";
import { checkRomanQuiz, genRomanQuiz } from "../controllers/romannummeralController.js";
import { checkQuiz, generateQuiz } from "../controllers/largenumwsContoller.js";
import { checkQuiz2, generateQuiz2 } from "../controllers/additionwsController.js";
import { checkSubtractionQuiz, generateSubtractionQuiz } from "../controllers/subtractionwsController.js";
import { checkMultiplicationQuiz, generateMultiplicationQuiz } from "../controllers/mulwsController.js";
import { checkDivisionQuiz, generateDivisionQuiz } from "../controllers/divwsController.js";
import { checkFactorQuiz, generateFactorQuiz } from "../controllers/factorwsController.js";
import { checkGeometryQuiz, generateGeometryQuiz } from "../controllers/geometryController.js";
import { checkMeasureQuiz, generateMeasureQuiz } from "../controllers/measurementwsController.js";
import { checkTimeQuiz, generateTimeQuiz } from "../controllers/timewsController.js";
import { checkMoneywsQuiz, generateMoneywsQuiz } from "../controllers/moneywsController.js";
import { checkPatternwsQuiz, generatePatternwsQuiz } from "../controllers/patternswsController.js";
import { checkFractionwsQuiz, generateFractionwsQuiz } from "../controllers/fractionwsController.js";


const router = express.Router();

router.get("/grade4ws1", generateQuiz);
router.get("/grade4ws2", generateQuiz2);
router.get("/grade4ws3", generateSubtractionQuiz);
router.get("/grade4ws4", generateMultiplicationQuiz);
router.get("/grade4ws5", generateDivisionQuiz);
router.get("/grade4ws6", generateFactorQuiz);
router.get("/grade4ws7", generateGeometryQuiz);
router.get("/grade4ws8", generateMeasureQuiz);
router.get("/grade4ws9", generateTimeQuiz);
router.get("/grade4ws10", generateMoneywsQuiz);
router.get("/grade4ws11", generatePatternwsQuiz);
router.get("/grade4ws12", generateFractionwsQuiz);


router.post("/checkgrade4ws1", checkQuiz);
router.post("/checkgrade4ws2", checkQuiz2);
router.post("/checkgrade4ws3", checkSubtractionQuiz);
router.post("/checkgrade4ws4", checkMultiplicationQuiz);
router.post("/checkgrade4ws5", checkDivisionQuiz);
router.post("/checkgrade4ws6", checkFactorQuiz);
router.post("/checkgrade4ws7", checkGeometryQuiz);
router.post("/checkgrade4ws8", checkMeasureQuiz);
router.post("/checkgrade4ws9", checkTimeQuiz);
router.post("/checkgrade4ws10", checkMoneywsQuiz);
router.post("/checkgrade4ws11", checkPatternwsQuiz);
router.post("/checkgrade4ws12", checkFractionwsQuiz);

router.get("/math", generateQuestionAddSub);
router.get("/mathp", generateQuestionAddSubp);
router.get("/mathp2", generateQuestionAddSubp2);
router.post("/check", checkAnswer);

router.get("/mathlevel3", generateQuestionAddSub3);
router.get("/mathplevel3", generateQuestionAddSubp3);
//router.post("/check", checkAnswer);
// Endpoint to get new sorting questions
router.get("/sort", generateSortingQuestions);
router.get("/sortlevel2", generateSortingQuestions2);
router.get("/sortlevel3", generateSortingQuestions3);
router.get("/sortp", generateSortingQuestionsp);
router.get("/sortplevel2", generateSortingQuestionsp2);
router.get("/sortplevel3", generateSortingQuestionsp3);

router.get("/mul", generateQuestionMul);
router.get("/mullevel2", generateQuestionMul2);
router.get("/mullevel3", generateQuestionMul3);
router.get("/mulp", generateQuestionMulp);
router.get("/mulplevel2", generateQuestionMulp2);
router.get("/mulplevel3", generateQuestionMulp3);

router.get("/div", generateQuestionDiv);
router.get("/divlevel2", generateQuestionDiv2);
router.get("/divlevel3", generateQuestionDiv3);

router.get("/measure", genUnitQuiz);
router.get("/measurelevel2", genAvgQuiz);
router.get("/measurelevel3", genWordQuiz);

router.get("/sudoku", generateSudoku);
router.get("/sudokulevel2", generateSudoku2);
router.get("/sudokulevel3", generateSudoku3);
router.get("/sudokup", generateSudokup);
router.get("/sudokuplevel2", generateSudokup2);
router.get("/sudokuplevel3", generateSudokup3);

router.get("/placevalue", genFacePlace);
router.get("/placevalue2",  genNumberFormation);
router.get("/placevalue3",  genExpandedQuiz);
router.get("/placevalue4",  genStandardQuiz);
router.get("/placevalue5",  genRoundingQuiz);
router.get("/placevalue6", genIPlaceValue);
router.get("/placevalue7", genRomanQuiz);
router.post("/checkplacevalue", checkFacePlace);
router.post("/checkplacevalue2",  checkNumberFormation);
router.post("/checkplacevalue3", checkExpandedQuiz);
router.post("/checkplacevalue4", checkStandardQuiz);
router.post("/checkplacevalue5", checkRoundingQuiz);
router.post("/checkplacevalue6", checkIPlaceValue);
router.post("/checkplacevalue7", checkRomanQuiz);



router.get("/money", genMoney);
router.get("/moneylevel2", genMoney2);
router.get("/moneylevel3", genWordProblems);
router.get("/moneylevel4", wordMoneyQuiz4);

router.get("/puzzle", generatePuzzle);
router.get("/puzzlep", generatePuzzle2);
router.get("/puzzlelevel2",generateFractionQuizPuzz2);
router.get("/puzzlelevel3", generateFractionQuizPuzz3);
router.get("/puzzleplevel2", puzzlep3);
router.get("/puzzleplevel3", puzzlep2);

router.get("/logic", generateLogic);
router.get("/logiclevel2", generateLogic2);
router.get("/logiclevel3", generateLogic3);
router.get("/logicp", generateLogicp);
router.get("/logicplevel2", logicQuizPuzz2);
router.get("/logicplevel3", logicQuizPuzz3);

// Endpoint to submit answers
router.post("/checksort", checkSortingAnswers);
router.post("/checkmulplevel3", checkAnswerCircle);
router.post("/checkmathlevel3", checkAddCircle);
router.post("/checksudoku", checkSudoku);
router.post("/checkmoney", checkAnswerMoney);
router.post("/checkmeasure", checkUnitAnswers);
router.post("/checkmeasure2", checkAvgAnswers);
router.post("/checkmeasure3", checkWordAnswers);

router.get("/fractionk", generateFractionQuizk);
router.get("/fractionk2", generateFractionQuizk2);
router.get("/fractionk3", generateFractionQuizk3);
router.get("/fraction", generateFractionQuiz);
router.get("/fraction2", generateFractionQuiz2);
router.get("/fraction3", generateFractionQuiz3);
router.get("/fractioneq4", generateqFractionQuiz4);
router.get("/fractionhcf4", hcfFractionQuiz4);
router.get("/fractionlcm4",lcmFractionQuiz4);
router.get("/fractionmixed4",mixedFractionQuiz4);
router.get("/fractionword4",wordFractionQuiz4);

router.post("/checkfraction", checkAnswerFraction);
router.post("/checkfraction2", checkAnswerFraction2);
router.get("/shape", generateShapeQuizStep);
router.get("/shape2", generateShapeQuizStep2);
router.get("/shape3", generateShapeQuizStep3);
router.get("/shapep1", generateShapeQuizStepp1);
router.get("/shapep2", generateShapeQuizStepp2);
router.post("/checkshape", checkShapeAnswerStep);
router.post("/checksudokup", checkSudokup);
router.post("/checkpuzzle", checkPuzzle);
router.post("/checklogic", checkLogic);
router.post("/explain", explainWrongAnswer);
router.post("/explain2", explainWrongAnswer2);
router.post("/explain3", explainWrongAnswer3);


export default router;
