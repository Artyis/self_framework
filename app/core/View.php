<?php 

namespace app\core;

class View {

    public $path;
    public $route;
    public $layout ='default';


    public function __construct($route)
    {
            $this->route=$route;
            $this->path=$route['controllers'].'/'.$route['action'];
            
      
    }

    public function render ($title='', $vars=[]){
        extract ($vars);
        if (file_exists('app/views/'.$this->path.'.php'))
        {
            ob_start();
            require 'app/views/'.$this->path.'.php';
            $content = ob_get_clean();
            require 'app/views/layouts/'.$this->layout.'.php';
        }else{
            echo 'Вид не найден '.$this->path;
        }
        
    }
    public function renderElement ($name){
        extract ($vars);
        if (file_exists('app/views/layouts/'.$name.'.php'))
        {
            ob_start();
            require 'app/views/layouts/'.$name.'.php';
            $contentelem = ob_get_clean();
            require 'app/views/layouts/'.$this->layout.'.php';
        }else{
            echo 'Вид не найден '.$name;
        }
        
    }

    public function redirect($url){
        header('location:'.$url);
    }

    public static function errorCode($type){
        http_response_code($type);
        require 'app/views/errors/'.$type.'.php';
        exit;
 
    }

}