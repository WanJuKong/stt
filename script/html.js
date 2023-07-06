/*
 *easier access to html document
 *
 * about this function :
 *
 * get, pull, read : gets innerHTML data of given element ID
 * 	return : sucsess ~ element data:string |
 * 	call : html.get(id) || html('get', id) || html.pull(id) || html('pull', id) || html.read(id) ... etc
 * 	parameter : type(only for html function), id
 *
 * put, set : put data to innerHTML of given element ID
 * 	return : sucsess ~ 0:number | fail ~ -1:number
 * 	call : html.put(id, putData) || html('put', id, putData) ... etc
 * 	parameter : type(), id, putData
 *
 * add, insert, append : add data to innerHTML od given element ID at given index(default set to -1)
 * 	return : success ~ 0:number | fail ~ -1:number
 * 	call : html.add(id, addData, index) || html('add', id, addData, index)...etc
 * 	parameter : type(), id, addData, index(optional)
 *
 *
 * Copyright 2023. juwan all rights reserved.
 */

const html = {
	get : function(id){
		return document.getElementById(id).innerHTML;
	},

	pull : function(id){	/* same as function 'get' */
		return this.get(id);
	},

	read : function(id){	/* same as function 'get' */
		return this.get(id);
	},

	put : function(id, putData){
		if(putData === undefined){
			alert('Err: putData undefined');
			return -1;
		}
		document.getElementById(id).innerHTML = putData;
		return 0;
	},

	set : function(id, putData){	/* same as function 'put' */
		return this.put(id, putData);
	},

	add : function(id, addData, index = -1){
		if(addData === undefined){
			alert('Err: addData undefined');
			return -1;
		}
		if(index==-1){
			document.getElementById(id).innerHTML += addData;
			return 0;
		}
		else{
			let txt = this.get(id);
			let rtnData = txt.slice(0,index) + addData + txt.slice(index);
			this.put(id, rtnData);
			return 0;
		}
	},

	insert : function(id, addData, index = -1){
		return this.add(id, addData, index);
	},

	append :function(id, addData, index = -1){
		return this.add(id, addData, index);
	}
};

function htmls(type, id, data = undefined, index = -1){
	if(type === 'get' || type === 'pull' || type === 'read')
		return html.get(id);
	if(type === 'put' || type === 'set')
                return html.put(id, data);
	if(type === 'add' || type === 'insert' || type === 'append')
                return html.add(id, data, index);
	alert("Err: no such type '" + type + "'");
	return -1;
}
