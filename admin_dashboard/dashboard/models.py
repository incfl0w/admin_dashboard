from django.db import models
from django.contrib.auth.models import Group


if not hasattr(Group, 'description'):
    field = models.TextField(blank=True, null=True)
    field.contribute_to_class(Group, 'description')

