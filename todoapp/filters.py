from django_filters import rest_framework as filters
from django_filters.widgets import RangeWidget

from todoapp.models import ToDo


class TodoFilter(filters.FilterSet):
    from_date = filters.DateTimeFromToRangeFilter(field_name='created_at',
                                                  widget=RangeWidget(attrs={'placeholder': 'YYYY/MM/DD'}))

    class Meta:
        model = ToDo
        fields = '__all__'
