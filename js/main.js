mapboxgl.accessToken = 'pk.eyJ1IjoiaHlkb3giLCJhIjoiY2t6MmRia2Y3MDRmeTJ1bnl3YWI3a2ZucSJ9.f7DQ8p_g9zDfSPr6-pAEPg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hydox/ckz2duviv006415p1e0xl78ql',
});

//Adds navigation controls: zooming in/out
map.addControl(new  mapboxgl.NavigationControl());