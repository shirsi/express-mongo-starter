const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

$(() => {
  $('.button').on('click', (event) => {

      event.preventDefault()
      let userInput = $('input[type="text"]').val()
