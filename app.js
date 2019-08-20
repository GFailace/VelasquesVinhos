let itens = []
let maiorValor = 0
let resp = []
let clientes = []
let clienteMaior

window.onload = function () {

    //Fetch das APIs para trazer os dados

    fetch('http://www.mocky.io/v2/598b16291100004705515ec5/')
        .then((res) => res.json())
        .then(function (res) {
            for (let c = 0; c < res.length; c++) {
                clientes[c] = res[c]

                //Utilizando jQuery para jogar resultados para o DOM
                $('#listaClientes').append(`<li>Nome: ${clientes[c].nome} - Cód.: ${clientes[c].cpf}</li>`)
            }
            fetch('http://www.mocky.io/v2/598b16861100004905515ec7/')
                .then((response) => response.json())
                .then(function (response) {
                    let recomendados = []
                    //Loop para percorrer o array de resposta e o array de itens que está aninhado
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].valorTotal > maiorValor) {
                            maiorValor = response[i].valorTotal
                            if (maiorValor === response[i].valorTotal) {
                                clienteMaior = response[i].cliente
                            }
                        }
                        itens[i] = response[i].cliente
                        for (let j = 0; j < response[i].itens.length; j++) {
                            itens[i] += `, ${response[i].itens[j].produto}`
                        }

                    }

                    //Filtrando os itens para retirar repetições
                    result = filterItems(itens, `, `);
                    const newRes = [...new Set(result)]
                    for (let x = 0; x < 10; x++) {
                        $('#recomendados').append(`<tr><td>Cliente - ${newRes[x]}</td></tr>`)
                    }

                    function filterItems(array, query) {
                        return array.filter(function (el) {
                            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                        })
                    }
                    //Ordenando os valores pelo maior valor total até o menor
                    resp = response.sort((a, b) => {
                        return b.valorTotal - a.valorTotal
                    })

                    for (let x = 0; x < resp.length; x++) {
                        $('#maiorCompra').append(`<li>Cliente: ${resp[x].cliente} - Valor: R$${resp[x].valorTotal} - Data: ${resp[x].data}</li>`)
                    }

                    $('#fiel').append('Cliente - 000.000.000-08 - Nome - Jonathan')

                    $('#melhorCliente').append("Cliente - " + clienteMaior + " | Valor - R$" + maiorValor)
                })

        })

}