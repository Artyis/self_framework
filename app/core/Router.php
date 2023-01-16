<?php
namespace app\core;

class Router{
    protected $routes=[];
    protected $params=[];

    public function __construct()
    {
       $arr=require 'app\config\routes.php';
       foreach ($arr as $key=> $val){
           $this->add($key,$val);
       }
       
    }
    public function add($route, $param){
        $route='#^'.str_replace('\\','/',$route).'$#';
        $this->routes[$route]=$param;
    }
    public function match(){
        $url=trim($_SERVER['REQUEST_URI'],'/');
        foreach ($this->routes as $router => $param){
            if (preg_match($router,$url,$matches)){
                $this->params=$param;
                return true;
            }
           
        }
        return false;
    }
    public function run(){
 
        if ($this->match()){
            $path='app\controllers\\'.ucfirst($this->params['controllers']).'Controller';
            if(class_exists($path)){
                    $action =$this->params['action'].'Action';
               if(method_exists($path,$action)){
                    $controller= new $path($this->params);
                    $controller->$action();
               }
               else{
                    View::errorCode(404);
               }
            }
            else{
                View::errorCode(404);
            }
        }
        else{
            View::errorCode(404);
        }
    }
}