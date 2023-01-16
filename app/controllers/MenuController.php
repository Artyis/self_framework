<?php
namespace app\controllers;

use app\core\Controller;

class MenuController extends Controller{

    public function getMenuGeneral(){
        $menu=$this->model->getMenu();
        
         
    }
}