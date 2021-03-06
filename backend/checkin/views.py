from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework import viewsets          
from .serializers import CheckinSerializer      
from .models import Checkin     
from rest_framework.decorators import api_view  
from django.http import JsonResponse
from django.core import serializers       
from django.db.models import Count, DateField, Sum, F, Min
from django.db.models.functions import TruncWeek, ExtractHour, ExtractMinute
from datetime import datetime, date, timedelta       

class CheckinView(viewsets.ModelViewSet):       
    serializer_class = CheckinSerializer          
    queryset = Checkin.objects.all()          

@api_view(["POST", "GET"])
def index(request):
    return render(request, "build/index.html", {})

@api_view(["POST", "GET"])
def view_404(request, exception=None):
    return redirect ('/')

def visitor_chart(request):
    labels = []
    data = []

    oldestWeek = Checkin.objects.earliest('date')
    currWeek = Checkin.objects.latest('date')

    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    dates = set()
    for week in daterange(getattr(oldestWeek, 'date'), getattr(currWeek, 'date')):
        start = week - timedelta(days=week.weekday())
        dates.add(start)
    
    dates = sorted(list(dates))

    queryset = Checkin.objects.annotate(weekstart = TruncWeek('date')).values('weekstart').annotate(count = Count('id')).order_by('weekstart')
    queryData = queryset.values('weekstart', 'count')

    finalSet = []
    for d in dates:
        finalCount = 0
        for val in queryData:
            if val['weekstart'] == d:
                finalCount = val['count']
        finalSet.append({'weekstart': d, 'count' : finalCount})

    for entry in finalSet:
        labels.append(entry['weekstart'])
        data.append(entry['count'])
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def visitor_chart2(request):
    labels = []
    data = []

    oldestWeek = Checkin.objects.earliest('date')
    currWeek = Checkin.objects.latest('date')

    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    dates = set()
    for week in daterange(getattr(oldestWeek, 'date'), getattr(currWeek, 'date')):
        start = week - timedelta(days=week.weekday())
        dates.add(start)

    dates = sorted(list(dates))

    queryset = Checkin.objects.all().annotate(durationDiff=F('timeOut') - F('timeIn'), duration=(ExtractHour('durationDiff')*60+ExtractMinute('durationDiff')), weekstart = TruncWeek('date')).values('weekstart').annotate(sumHours = Sum('duration')).order_by('weekstart')
    queryData = queryset.values('weekstart', 'sumHours')
    
    finalSet = []
    for d in dates:
        hours = 0
        for val in queryData:
            if val['weekstart'] == d:
                hours = val['sumHours']
        finalSet.append({'weekstart': d, 'sumHours' : hours})

    for entry in finalSet:
        labels.append(entry['weekstart'])
        data.append(entry['sumHours'] / 60)
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def visitor_chart6(request):
    labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    data = [0, 0, 0, 0, 0]

    # Get all the data
    queryset = Checkin.objects.all()

    # Iterate over all the dates
    for entry in queryset.values("date"):
        # Get the raw datetime object from the entry
        dateObj = list(entry.values())[0]
        # Get the weekday, where 0 is monday and 6 is sunday
        weekdayIndex = dateObj.weekday()
        # Nobody checks in on weekends
        if (weekdayIndex == 5 or weekdayIndex == 6):
            continue
        data[weekdayIndex] += 1
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def visitor_chart10(request):
    labels = []
    data = []

    queryset = Checkin.objects.values('name')
    #queryset = Checkin.objects.values('date').annotate(visitor_count=Count('date')).order_by('date')
    for entry in queryset:
        labels.append(entry['name'])
        data.append(2)
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def dashboard_with_checkin(request):
    return render(request, 'dashboard.html')

def checkin_data(request):
    dataset = Checkin.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)