from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
# from django.contrib.auth import get_user_model
from forum_polytechnicien.models import *


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(
        label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'name',)

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Les mots de passes ne correspondent pas")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'password', 'name',
                  'is_active', 'is_admin', 'profile_photo', 'hobbies', 'slug')


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'name', 'slug', 'is_active',
                    'is_admin', 'created_at', 'updated_at',)
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
         'fields': ('name', 'profile_photo', 'hobbies', 'slug')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'slug', 'profile_photo', 'hobbies', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('id',)
    filter_horizontal = ()


# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
admin.site.unregister(Group)


class HobbieAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'image',
                    'category_hobbie', 'created_at', 'updated_at',)


class CategoryHobbieAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'image',
                    'created_at', 'updated_at',)


class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'contents', 'comment', 'answer',
                    'answerer', 'created_at', 'updated_at',)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'contents', 'publication',
                    'commentator', 'created_at', 'updated_at',)


class PublicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'contents', 'owner', 'question',
                    'created_at', 'updated_at',)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'contents', 'owner',
                    'created_at', 'updated_at',)


class LikeDislikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'vote', 'user', 'comment',
                    'publication', 'answer', 'question', 'created_at', 'updated_at',)


class RequestModificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'contents', 'question', 'applicant',
                    'question_owner', 'created_at', 'updated_at',)


class PublicationImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'publication', 'created_at', 'updated_at',)


admin.site.register(Hobbie, HobbieAdmin)
admin.site.register(CategoryHobbie, CategoryHobbieAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Publication, PublicationAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(LikeDislike, LikeDislikeAdmin)
admin.site.register(RequestModification, RequestModificationAdmin)
admin.site.register(PublicationImage, PublicationImageAdmin)
