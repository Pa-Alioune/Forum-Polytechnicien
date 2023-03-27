"""Backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from forum_polytechnicien.views import *

router = routers.SimpleRouter()
router.register('user', UserViewSet, basename='user')
router.register('hobbie', HobbieViewSet, basename='hobbie')
router.register('category-hobbie', CategoryHobbieViewSet,
                basename='category_hobbie')
router.register('connected-user', UserConnectedViewSet,
                basename='connected-user')
router.register('timeline', TimelineViewSet, basename='timeline')
router.register('questions', QuestionListViewSet, basename='questions')
router.register('publications', PublicationListViewSet,
                basename='publications')
router.register('comments', CommentViewSet, basename='comments')
router.register('answers', AnswerViewSet, basename='answers')
router.register('like-dislike', LikeDislikeViewSet, basename='like-dislike')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('accounts/', include('allauth.urls')),
    # path('', include('main.urls')),
    path('api/token', TokenObtainPairView.as_view(), name='obtain_tokens'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='refresh_token'),

    path('api/like-dislike/like_publication',
         LikeDislikeViewSet.as_view({'post': 'like_publication'}), name='like_publication'),
    path('api/like-dislike/dislike_publication',
         LikeDislikeViewSet.as_view({'post': 'dislike_publication'}), name='dislike_publication'),
    path('api/like-dislike/undo_publication',
         LikeDislikeViewSet.as_view({'post': 'undo_publication'}), name='undo_publication'),

    path('api/like-dislike/like_comment',
         LikeDislikeViewSet.as_view({'post': 'like_comment'}), name='like_comment'),
    path('api/like-dislike/dislike_comment',
         LikeDislikeViewSet.as_view({'post': 'dislike_comment'}), name='dislike_comment'),
    path('api/like-dislike/undo_comment',
         LikeDislikeViewSet.as_view({'post': 'undo_comment'}), name='undo_comment'),

    path('api/like-dislike/like_question',
         LikeDislikeViewSet.as_view({'post': 'like_question'}), name='like_question'),
    path('api/like-dislike/dislike_question',
         LikeDislikeViewSet.as_view({'post': 'dislike_question'}), name='dislike_question'),
    path('api/like-dislike/undo_question',
         LikeDislikeViewSet.as_view({'post': 'undo_question'}), name='undo_question'),

    path('api/like-dislike/like_answer',
         LikeDislikeViewSet.as_view({'post': 'like_answer'}), name='like_answer'),
    path('api/like-dislike/dislike_answer',
         LikeDislikeViewSet.as_view({'post': 'dislike_answer'}), name='dislike_answer'),
    path('api/like-dislike/undo_answer',
         LikeDislikeViewSet.as_view({'post': 'undo_answer'}), name='undo_answer'),

    path('api/question/<slug:slug>/', QuestionBySlugViewSet.as_view(
        {'get': 'retrieve_by_slug', }), name='question-by-slug'),
    path('api/user/<slug:slug>/', UserBySlugViewSet.as_view(
        {'get': 'retrieve_by_slug', }), name='question-by-slug'),

    path('api/', include(router.urls)),

]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
