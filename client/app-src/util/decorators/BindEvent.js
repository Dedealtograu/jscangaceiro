import { obrigatorio } from '../../util/index';

export function bindEvent(
    event = obrigatorio('event'),
    seletor = obrigatorio('selector'),
    prevent = true
) {

    return function(target, propertyKey, descriptor) {
        Reflect.defineMetadata(
            'bindEvent',
            {event, seletor, prevent, propertyKey},
            Object.getPrototypeOf(target),
            propertyKey
        );
        
        return descriptor;
    }
}