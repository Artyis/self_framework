<?php

namespace app\models ;

use app\core\Model;
use app\models\Menu;



class Main extends Model {
    
    public function getInfo(){
      return  $this->db->row('SELECT * FROM zaimies WHERE id =1');
    }

    
  


}