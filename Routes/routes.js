import express from 'express' ;
const route = express.Router();
import {AddTask , UpdateTask , GetTaskById , GetAllTasks , CompleteTask} from '../Controller/CRUD.js' ;


route.route('/addtask').post(AddTask); 
route.route('/UpdateTask').put(UpdateTask); 
route.route('/CompleteTask').put(CompleteTask); 
route.route('/GetTaskById/:id').get(GetTaskById); 
route.route('/GetAllTasks').get(GetAllTasks); 
export default route;