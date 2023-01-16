<?php
namespace app\lib;

use PDO;

class Db{

    protected $db;

    public function __construct()
    {
      
       $config= require 'app/config/db.php';
       $this->db=new PDO ('mysql:host='.$config['host'].';dbname='.$config['db'], $config['user'], $config['pass']);

    }

    public function query($sql,$params=[]) {
        $stnt=$this->db->prepare($sql);
        if(!empty($params)){
          foreach($params as $key=>$val) {
            $stnt->bindValue(':'.$key, $val);
          }
        }
        $stnt->execute();
        return $stnt;
    }

    public function row ($sql, $params=[]){
        $res=$this->query($sql, $params);
        return $res->fetchAll(PDO::FETCH_OBJ);
    }

    public function column($sql, $params=[]){
        $res=$this->query($sql, $params);
        return $res->fetchColumn();
    }
}