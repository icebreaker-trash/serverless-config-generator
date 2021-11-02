export interface IOutputOption {
  dir?: string
  filename?: string
}
export interface IGeneratorOption {
  input?: string
  output?: string | IOutputOption
}
