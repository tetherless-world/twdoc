function doSubmit() {
    var form = document.twdocsmedia;
    form.submit();
}

function uploadForm(file) {
    $("#twdocs-file").val(file);
    $("#twdocs-form").dialog("open");
}

function revisionDialog() {
    $("#twdocs-revision-form").dialog({
	autoOpen: false,
	height: 200,
	width: 350,
	resizable: false,
	modal: true,
	buttons: {
	    "Upload File": function() {
		$("form",$(this))[0].submit();
	    },
	    "Cancel": function() {
		$(this).dialog("close");
	    }
	}
    });
}

function uploadDialog() {
    $("#twdocs-upload").dialog({
	autoOpen: false,
	height: 200,
	width: 350,
	resizable: false,
	modal: true,
	buttons: {
	    "Upload File": function() {
		var iframe = document.getElementById("twdocs-upload-iframe");
		var doc = iframe.contentDocument;
		if(doc==null || doc==undefined)
		    doc = iframe.contentWindow.document;
		var form = doc.twdocsmedia;
		if(form.content.value == null || form.content.value == "")
		    return false;
		if(form.file.value == null || form.file.value == "")
		    return false;

		if(navigator.appName=="Netscape") {
		    var listener = function() {
			$(iframe).unbind("load");
			iframe.removeEventListener("load",listener,true);
			doc = iframe.contentDocument;
			if(doc==null || doc==undefined)
			    doc = iframe.contentWindow.document;
			var text = doc.documentElement.textContent;
			text = text.substr(0,text.lastIndexOf("}")+1);
			try {
			    var obj = JSON.parse(text);
			    if(document.getElementById("twdocs-upload").place != undefined) {
				var x = document.getElementById("twdocs-upload").place;
				var parent = x.parent();
				var id = x.attr("id");
				//x.detach();
				//parent.append("<span>"+obj.latest+'</span><input type="hidden" id="'+id+'" name="'+id+'" value="'+obj.latest+'"/>');
				x.replaceWith("<span>"+obj.latest+'</span><input type="hidden" id="'+id+'" name="'+id+'" value="'+obj.latest+'"/>');
			    }
			}
			catch(err) {
			    
			}
			$("#twdocs-upload").dialog("close");
		    }
		    iframe.addEventListener("load",listener,true);
		}
		else {
		    $(iframe).bind("load", function() {
			$(iframe).unbind("load");
			doc = iframe.contentDocument;
			if(doc==null || doc==undefined)
			    doc = iframe.contentWindow.document;
			var text = doc.documentElement.textContent;
			text = text.substr(0,text.lastIndexOf("}")+1);
			try {
			    var obj = JSON.parse(text);
			    if(document.getElementById("twdocs-upload").place != undefined) {
				var x = document.getElementById("twdocs-upload").place;
				var parent = x.parent();
				var id = x.attr("id");
				//x.detach();
				//parent.append("<span>"+obj.latest+'</span><input type="hidden" id="'+id+'" name="'+id+'" value="'+obj.latest+'"/>');
				x.replaceWith("<span>"+obj.latest+'</span><input type="hidden" id="'+id+'" name="'+id+'" value="'+obj.latest+'"/>');
			    }
			}
			catch(err) {
			    
			}
			$("#twdocs-upload").dialog("close");
		    });
		}
		form.submit();
	    },
	    Cancel:function() {
		$(this).dialog("close");
	    }
	},
	close:function() {
	    var iframe = document.getElementById("twdocs-upload-iframe");
	    iframe.src = $("#twdocs-upload").attr("path");
	}
    });
}

function prepareForm() {
    $("#twdocs-form").dialog({
	autoOpen: false,
	height: 300,
	width: 350,
	modal: true,
	buttons: {
	    "Upload File": function() {
		doSubmit();
	    },
	    Cancel:function() {
		$(this).dialog("close");
	    }
	},
	close:function() {
	    document.twdocsmedia.file.value = "";
	    document.twdocsmedia.title.value = "";
	    document.twdocsmedia.content.value = "";
	}
    });
}

function showiFrame(id) {
    document.getElementById("twdocs-upload").place = $(id);
    $("#twdocs-upload").dialog("open");
}

function showRevisionUpload(id,filename,url) {
    var form = $("#twdocs-revision-form");
    $("*[name=\"file\"]",form).val(filename);
    $("*[name=\"url\"]",form).val(url);
    form.dialog("open");
}

$(document).ready(function() {
    if($("#twdocs-upload").length>0) {
	uploadDialog();
    }
    if($("#twdocs-form").length>0) {
	prepareForm();
    }
    if($("#twdocs-revision-form").length>0) {
	revisionDialog();
    }
    if(document.twdocsmedia!=undefined) {
	$(document.twdocsmedia.content).change(function() {
	    var i=0;
	    if((i=this.value.lastIndexOf("\\"))>=0) {
		$("#file").val(this.value.substr(i+1).replace(/ /,"_"));
	    }
	    else {
		$("#file").val(this.value.replace(/ /,"_"));
	    }
	});
    }
});
