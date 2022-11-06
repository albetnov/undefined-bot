import BaseCommand from "./BaseCommand";

/**
 * An object builder for new commands (Class Based)
 * To be then parsed by Kernel.
 */
export default function KernelClassRegisterer(commandClass: BaseCommand) {
  return {
    handler: commandClass.handler,
    schema: commandClass.builder(),
    name: commandClass.name,
  };
}
