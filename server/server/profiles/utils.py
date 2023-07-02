from enum import Enum


def get_default_profile_picture_path():
    return 'images/base-profile-pic.png'


class ChoicesEnumMixin:
    @classmethod
    def choices(cls):
        return [(x.name, x.value) for x in cls]

    @classmethod
    def max_len(cls):
        return max(len(choice[1]) for choice in cls.choices()) + 1  # +1 for safety margin


class GenderChoices(ChoicesEnumMixin, Enum):
    Man = "Man"
    Woman = "Woman"
    PreferNotToSay = "PreferNotToSay"
    Other = "Other"

    @classmethod
    def default(cls):
        return cls.PreferNotToSay
