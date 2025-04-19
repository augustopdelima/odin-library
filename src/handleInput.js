
function createDocumentListener() {

    const state = {
        observers: [],
    }


    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    document.addEventListener('click', handleEvent);
    document.addEventListener('submit', handleSubmit);


    function generateIdentifier(target) {
        if (target.dataset && target.dataset.command) {
            return target.dataset.command;
        }

        if (target.id) {
            return target.id;
        }

        if (target.classList && target.classList.length > 0) {
            return [...target.classList].join(' ');
        }

        return target.type || 'unknown';
    }

    function handleEvent(event) {
        const { target } = event;

        const identifier = generateIdentifier(target);

        const command = {
            target,
            identifier,
            event
        }

        notifyAll(command);

    }

    function handleSubmit(event) {
        event.preventDefault();

        handleEvent(event);
    }

    function notifyAll(command) {
        for (const observersFunction of state.observers) {
            observersFunction(command);
        }
    }

    return { subscribe }
}

export default createDocumentListener;