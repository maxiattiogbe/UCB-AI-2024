export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isDisabled(
  agree: { value: boolean },
  email: string,
  name: string
): boolean {
  return !agree.value || !isValidEmail(email) || name.length === 0;
}

export function replaceCanvasImport(codeSnippet: string): string {
  // Define the regex pattern to match the specific import line
  const pattern: RegExp = /^from graphics import Canvas$/gm;

  // Define the replacement block of code
  const replacement: string = `
import js  # This import assumes there's a bridging mechanism between Python and JavaScript.

class Canvas:
      def __init__(self, width: int, height: int):
          self.width = width
          self.height = height
          self.canvas = js.document.querySelector("#canvas")
          self.canvas.width = width
          self.canvas.height = height
          self.context = self.canvas.getContext('2d')
  
      def create_rectangle(self, left, top, width, height, color):
          self.context.fillStyle = color
          self.context.fillRect(left, top, width, height)`;

  // Perform the replacement
  return codeSnippet.replace(pattern, replacement);
}
