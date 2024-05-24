function moveWithArrows(formName) {
    const form = document.getElementById(formName);
    const inputs = form.querySelectorAll('input');

    inputs.forEach((input, index) => {
        inputs[0].focus();
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && index < inputs.length - 1) {
                inputs[index + 1].focus();
                return;
            }

            if (e.key === 'ArrowUp' && index > 0) {
                inputs[index - 1].focus();
                return;
            }
        });
    });
}
