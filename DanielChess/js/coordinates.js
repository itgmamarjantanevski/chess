    var rowIndex = 0;
	var cellIndex = 0;
	var nTable = "";
	var nRows = 0;
	var nCells = 0;
    var LETTERS = 'abcdefgh';

	function showCoords(r,c){
       // if(){}
		rowIndex = r;
		cellIndex = c;
		//alert('Row '+rowIndex + '\nCell '+cellIndex);
        //alert(LETTERS.charAt(cellIndex)+rowIndex);
	}

	function getCoords(currCell){

		for (i=0; i<nRows; i++)
			{
			 for (n=0; n<nCells; n++)
				{
				 if (nTable.rows[i].cells[n] == currCell)
					{
					 showCoords(i,n);
					}
				}
			}
	}

	function mapTable(){

		nTable = document.getElementById('chess_board');
		nRows = nTable.rows.length;
		nCells = nTable.rows[0].cells.length;
		for (i=0; i<nRows; i++)
			{
			 for (n=0; n<nCells; n++)
				{
				 nTable.rows[i].cells[n].onclick = function()
					{
					 getCoords(this);				 	
					}
				 nTable.rows[i].cells[n].onmouseover = function()
					{
					 this.style.cursor = 'pointer';			 	
					}
				}
			}
	}

	onload=mapTable;