<?php

namespace app\models ;

use app\core\Model;



class Menu extends Model {
    
    public function getMenu(){
      return  $this->db->row('SELECT * FROM menu');
    }
  


}