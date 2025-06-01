import requests
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from datetime import datetime
from django.shortcuts import render

@require_GET
def tasa_cambio(request):
    user = 'ignacio'
    password = 'Nachito2004$'
    fecha = datetime.today().strftime('%Y-%m-%d')
    url = f'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user={user}&pass={password}&firstdate={fecha}&lastdate={fecha}&timeseries=TCB_520_TIPO_CAMBIO_NOMINAL&function=GetSeries'

    try:
        response = requests.get(url)
        response.raise_for_status()  # para lanzar error si status != 200
        data = response.json()

        tasa = None
        series = data.get('Series', [])
        if series and 'Series' in series[0] and series[0]['Series']:
            valor_str = series[0]['Series'][0]['Obs'][0]['ObsValue']
            tasa = float(valor_str)

        if tasa is not None:
            return JsonResponse({'tasa': tasa})
    except Exception as e:
        print('Error al obtener tasa:', e)

    # Si falla, devolver tasa fija para no romper la app
    return JsonResponse({'tasa': 900})


def inicio(request):
    return render(request, 'miapp/index.html')
