#!/usr/bin/env node

const chalk = require( 'chalk' )
const figlet = require( 'figlet' )
const package = require( './package.json' )

const args = process.argv
const exec = args[ 1 ]
const command = ( args[ 2 ] || '' ).toLowerCase()
const opt = require( 'minimist' )( args.slice( 3 ) )

const fonts = [
    'big', 'doom', 'graffiti', 'rectangles', 'gothic', 'varsity', 'script',
    'shadow', 'small', 'speed', 'sl script', 'stop', 'swan', 'soft'
]
const ver = 'v' + package.version
const title = figlet.textSync( 'Simple Map Kit', {
    font: fonts[ Math.round( fonts.length * Math.random() ) ],
    horizontalLayout: 'full'
} ).slice( 0, -ver.length )
console.log( chalk.yellow( title ) + chalk.gray( ver ) )

if ( !opt.package ) {
    const packageNameSegs = package.name.split( '/' )
    if ( packageNameSegs.length == 1 )
        opt.package = 'smk'
    else
        opt.package = `${ packageNameSegs[ 0 ] }/smk`
}

// if the first arg is 'ui', then we should attempt to launch the ui editor
if ( command == 'ui' )
    return require( './smk-ui' )( opt )

// if the first arg is 'create', then we should attempt to launch the cli project creator
if ( command == 'create' )
    return require( './smk-create' )( opt )

if ( command == 'help' || command == '-h' || command == '-?' ) {
    usage()
    console.log( chalk.yellow( 'To create a new SMK project:     ' ) + chalk.blueBright( `${ exec } create [name]` ) )
    console.log( chalk.yellow( 'To modify an SMK project config: ' ) + chalk.blueBright( `${ exec } ui [-p port]` ) )
    return 1
}

console.log( chalk.red( command ? `Unknown command specified: "${ command }"` : 'No command specified' ) )

usage()
return 1

function usage() {
    console.log( 'Usage: ' + chalk.blueBright( `${ exec } create|ui|help` ) )
}
