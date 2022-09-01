const calculator = document.querySelector(".calculator")
const display = document.querySelector(".display")
const COMMAND_INPUTS = ["=", "clear", "delete"]
const COMMAND_INPUTS_MAP = {
  "=": "=",
  "Enter": "=",
  "Backspace": "delete",
  "Delete": "delete",
  "Escape": "clear",

}
const OPERATION_INPUTS = ["+", "-", "/",  "*"]
const DECIMAL_LENGTH = 10
let operation = []
let equalCounter = 0

window.addEventListener("keydown", ({ key }) => {
  const isDigit = new RegExp(/\d/)
  const isOperation = OPERATION_INPUTS.includes(key)
  const isCommand = COMMAND_INPUTS_MAP[key
  ]
  const isRepeatedOperation =
    OPERATION_INPUTS.includes(lastOperator()) &&
    OPERATION_INPUTS.includes(key)
  
  if (isRepeatedOperation) return

  if (isDigit.test(key) || isOperation) {
    addToOperation(key)
    updateDisplay()
  }
  if (isCommand) {
    operationMap[isCommand]?.()
    updateDisplay()
  }
  return
})

calculator.addEventListener("click", ({ target }) => {
  if (target.nodeName !== "BUTTON") return
  const entry = target.innerHTML
  const isRepeatedOperation =
    OPERATION_INPUTS.includes(lastOperator()) &&
    OPERATION_INPUTS.includes(entry)
  
  if (isRepeatedOperation) return 
  operationMap[entry]?.() || addToOperation(entry)
  updateDisplay()
})

const formatNumber = number => new Intl.NumberFormat('pt-BR').format(number)

const lastOperator = () => operation.at(-1)

const lastOperation = () => {
  const lastOperationRegex = new RegExp(/([+\/\*-](\d+)$)/)
  return stringfyOperation(operation).match(lastOperationRegex)?.[0]
}

const stringfyOperation = value => value.join("").toString()

const addToOperation = input =>  {
  if (COMMAND_INPUTS.includes(input)) return
  equalCounter = 0
  operation.push(input)
}

const updateDisplay = () => {
  const parseOperation = stringfyOperation(operation) || 0
  display.innerText = parseOperation
}

const equalOperation = () => {
  const cloneOperations = [...operation]
  const operantionEndsWithOperator = OPERATION_INPUTS.includes(
      stringfyOperation(cloneOperations).at(-1))
 
  if (operantionEndsWithOperator) return
  const result = formatNumber(
    eval(stringfyOperation(cloneOperations))
  )
  operation = [result]
  updateDisplay()
  equalCounter++
}

const clearOperation = () => {
  operation = []
  equalCounter = 0
  updateDisplay()
}

const deleteOperation = () => {
  operation = [...operation.join("").split("").slice(0, -1)]
}

const operationMap = {
  "=": equalOperation,
  "clear": clearOperation,
  "delete": deleteOperation
}