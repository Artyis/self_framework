<?php
namespace app\controllers;

use app\core\Controller;


class MainController extends Controller {
    public $title;
    public $vars;
    public function indexAction(){

       
    $row=$this->model->getInfo();
    foreach ($row as $key => $val){
        $this->title=$val->title;
        $this->vars=(array)$val;
    }
     $this->view->render($this->title, $this->vars);
     
  
    
    }
}