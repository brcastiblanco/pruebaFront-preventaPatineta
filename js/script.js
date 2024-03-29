// Juego //
var select = false;
var c = "inc";
var pos_s = "";
var id_s = "";

var rompecabezas = {
    _arr_pos_r: new Array(),
    _arr_pos_a: new Array(),

    _mostrar: function(tam_img) {
        rompecabezas._arr_pos_r.length = 0;
        var piezas = 16;
        var tb = document.createElement('table');
        var dp = document.createElement('div');
        tb.className = 'm-auto';
        dp.className = 'posic';
        var ar = Math.sqrt(piezas);
        var c = 0;
        var pos_img = tam_img / ar;
        for (var fil = 1; fil <= ar; fil++) {
            var tr = document.createElement('tr');
            for (var cel = 1; cel <= ar; cel++) {
                c++;
                var td = document.createElement('td');
                td.className = 'pieza';
                td.id = 'pos_' + c;
                td.style.width = pos_img + 'px';
                td.style.height = pos_img + 'px';
                var dbp = document.createElement('div');
                dbp.id = 'val_bp_' + c;
                var p = Math.round(((pos_img * cel) - pos_img) * -1) + 'px ' + Math.round(((fil * pos_img) - pos_img) * -1) + 'px';
                td.style.backgroundPosition = p;
                rompecabezas._arr_pos_r.push(p);
                dbp.innerHTML = p;
                dp.appendChild(dbp);
                td.onclick = function() {
                    rompecabezas._cambiaBGP(this.id);
                    rompecabezas._compruebaFin();
                }
                tr.appendChild(td);
            }
            tb.appendChild(tr);
        }
        if (!rompecabezas._get("div_content")) {
            var cont = document.createElement('div');
            cont.id = 'div_content';
            cont.appendChild(tb);
            cont.appendChild(dp);
            document.getElementById('juego-rompecabezas').appendChild(cont);
        } else {
            rompecabezas._get("div_content").innerHTML = '';
            rompecabezas._get("div_content").appendChild(tb);
            rompecabezas._get("div_content").appendChild(dp);
        }
    },

    _barajar: function() {
        var num_alt = null;
        var arr = new Array();
        var i = -1;
        var repite = "no";
        var pie = 16;
        var pie1 = pie + 1;
        while (arr.length < pie) {
            repite = "no";
            num_alt = Math.floor(Math.random() * pie1);
            if (num_alt != 0) {
                if (arr.length == 0) {
                    i++;
                    arr[i] = num_alt;
                } else {
                    for (j = 0; j <= arr.length - 1; j++) {
                        if (arr[j] == num_alt) {
                            repite = "si";
                        }
                    }
                    if (repite != "si") {
                        i++;
                        arr[i] = num_alt;
                    }
                }
            }
        }

        var id = 0;
        for (k = 0; k <= arr.length - 1; k++) {
            id = k - (-1);
            rompecabezas._get("pos_" + id).style.backgroundPosition = rompecabezas._get("val_bp_" + arr[k]).innerHTML;
        }
    },

    _cambiaBGP: function(id) {
        if (select == false) {
            pos_s = rompecabezas._get(id).style.backgroundPosition;
            id_s = id;
            select = true;
            rompecabezas._get(id_s).style.boxShadow = '1px 1px 14px #FFF,-1px -1px 14px #FFF, 1px -1px 14px #FFF,-1px 1px 14px #FFF';
        } else {
            var pos_n = rompecabezas._get(id).style.backgroundPosition;
            var id_n = id;
            c = "com";
            select = false;
        }

        if (c == "com") {
            rompecabezas._get(id_n).style.backgroundPosition = pos_s;
            rompecabezas._get(id_s).style.backgroundPosition = pos_n;
            c = "inc";
            rompecabezas._get(id_s).style.boxShadow = '';
        }
    },

    _compruebaFin: function() {
        var pie = 16;
        var fin = false;
        rompecabezas._arr_pos_a.length = 0;
        for (var i = 1; i <= pie; i++) {
            rompecabezas._arr_pos_a.push(rompecabezas._get("pos_" + i).style.backgroundPosition);
        }
        for (var j = 0; j < rompecabezas._arr_pos_r.length; j++) {
            if (rompecabezas._arr_pos_r[j] != rompecabezas._arr_pos_a[j]) {
                fin = false;
                break;
            } else {
                fin = true;
            }
        }

        setTimeout(function() {
            if (fin) {
                alert("Bien hecho!")
            }
        }, 600);
    },

    _get: function(id) {
        return document.getElementById(id);
    }
};

$(document).ready(function() {
    if ($(window).width() > 768) {
        rompecabezas._mostrar(600);
    } else {
        rompecabezas._mostrar(300);
    }
    rompecabezas._barajar();
    $(window).resize(function() {
        if ($(window).width() > 768) {
            rompecabezas._mostrar(600);
        } else {
            rompecabezas._mostrar(300);
        }
        rompecabezas._barajar();
    });
})

// slider //
$('.slider-resena').slick();