console.log('Client side here');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const error = document.querySelector('#one');
const success = document.querySelector('#two');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    one.textContent = 'Loading...';
    two.textContent = '';
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then(data => {
        if(data.error) {
            one.textContent = data.error;
        } else {
            const { forecast: {temperature, feelslike, description, humidity }, location} = data;
            one.textContent = location + '. ';
            two.textContent = description + '. It is ' + temperature + ' degress out, but it is like ' + feelslike + ' degress out. It has a humidity of ' + humidity + '%';
        }
    });
});
})