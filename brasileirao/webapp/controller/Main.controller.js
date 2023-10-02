SecretKey = "Bearer test_1782e7a9c2f42721faf933727fecde",
// Buscar a chave em https://api-futebol.com.br/dashboard/api-keys

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
            // var dadosGerais = {
            //     nomeCampeonato: "Brasileirão 2023 no canal FioriNET",
            //     rodada: 99
            // };            

            // var dadosModel = new JSONModel();
            // dadosModel.setData(dadosGerais);

            // var tela = this.getView();
            // tela.setModel(dadosModel, "ModeloDadosGerais");

            var dadosGerais = {};            
            var classificacao = {};
            var partidas = {};

            var dadosModel = new JSONModel();
            var classificacaoModel = new JSONModel();
            var partidasModel = new JSONModel();

            dadosModel.setData(dadosGerais);
            classificacaoModel.setData(classificacao);
            partidasModel.setData(partidas);

            var tela = this.getView();
            tela.setModel(dadosModel, "ModeloDadosGerais");
            tela.setModel(classificacaoModel, "ModeloTabela");
            tela.setModel(partidasModel, "ModeloPartidas");

            this.onBuscarClassificacao();
            this.onBuscarDadosGerais();          
            
            },

            onBuscarClassificacao: function() {
                var oModeloTabela = this.getView().getModel("ModeloTabela");
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    methodo : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : SecretKey 
                    }
                };
                $.ajax(configuracoes).done(
                    function(response){
                        oModeloTabela.setData({"Classificacao" : response });
                }.bind(this)
                )
            },

            onBuscarDadosGerais: function() {
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    methodo : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : SecretKey
                    }
                };
                $.ajax(configuracoes).done(
                    function(response){
                        oModeloDadosGerais.setData(response);
                        var rodadaAtual = response.rodada_atual.rodada;
                        this.onBuscarPartidas(rodadaAtual);

                }.bind(this)
                )
            },

            onBuscarPartidas: function(rodadaAtual) {
                var oModeloPartidas = this.getView().getModel("ModeloPartidas");
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                    methodo : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : SecretKey
                    }
                };
                $.ajax(configuracoes).done(
                    function(response){
                        oModeloPartidas.setData(response);
                }.bind(this)
                )
            }
        });
    });