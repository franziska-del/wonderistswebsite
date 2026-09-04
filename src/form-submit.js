const endpoint = 'https://formsubmit.co/ajax/salty@oceanlovers.com';

export const submitForm = async ({ form, subject, successMessage, errorMessage }) => {
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');
  const originalButtonText = button.textContent;
  const data = Object.fromEntries(new FormData(form));

  data._subject = subject;
  data._replyto = data.email;
  data._template = 'table';
  data._url = window.location.href;

  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Form submission failed (${response.status})`);

    form.reset();
    status.textContent = successMessage;
  } catch (error) {
    console.error(error);
    status.textContent = errorMessage;
  } finally {
    button.disabled = false;
    button.textContent = originalButtonText;
  }
};
