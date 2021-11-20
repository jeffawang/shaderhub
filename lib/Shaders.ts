import fs from 'fs'
import path from 'path'
import { ShaderSrc } from './ShaderTypes'

// cwd should be git root.
const shaderDirectory = path.join(process.cwd(), 'public', 'shaders')

export function getShaderSrcs(): ShaderSrc[] {
    const shadersFilePath = path.join(shaderDirectory, 'shaders.json')
    const shadersFileContents = fs.readFileSync(shadersFilePath, 'utf8')
    const shaders = JSON.parse(shadersFileContents) as ShaderSrc[]

    const shaderDefaultsFilePath = path.join(shaderDirectory, 'shaderDefaults.json')
    const shaderDefaultsFileContents = fs.readFileSync(shaderDefaultsFilePath, 'utf8')
    const shaderDefaults = JSON.parse(shaderDefaultsFileContents) as ShaderSrc

    return shaders.map((i) => ({...shaderDefaults, ...i}))
}
